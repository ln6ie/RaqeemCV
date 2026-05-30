import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, Platform, ScrollView, ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { readAsStringAsync } from 'expo-file-system';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { useCVContext } from '../context/CVContext';
import { getFontFamily } from '../constants/tokens';
import { SheetHeader } from './SheetHeader';
import { GlassInput } from './GlassInput';
import { GlassicView } from './Glassic';

interface PDFImporterProps {
  visible: boolean;
  onClose: () => void;
}

const PDF_HTML = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
<script>pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';</script>
</head>
<body style="margin:0;background:#fff">
<script>
async function extractText(base64) {
  try {
    const bytes = atob(base64);
    const len = bytes.length;
    const arr = new Uint8Array(len);
    for (let i = 0; i < len; i++) arr[i] = bytes.charCodeAt(i);
    const pdf = await pdfjsLib.getDocument({data: arr}).promise;
    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map(function(item) { return item.str; }).join(' ');
      text += pageText + '\\n\\n';
    }
    window.ReactNativeWebView.postMessage(JSON.stringify({type:'text',text:text.trim()}));
  } catch(e) {
    window.ReactNativeWebView.postMessage(JSON.stringify({type:'error',error:e.message}));
  }
}
</script>
</body>
</html>`;

export const PDFImporter = ({ visible, onClose }: PDFImporterProps) => {
  const { isDarkMode, theme, isRTL, t, importCVData, showSnack } = useCVContext();
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [pdfBase64, setPdfBase64] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [step, setStep] = useState<'pick' | 'preview' | 'extracted'>('pick');
  const extractWebViewRef = useRef<WebView>(null);

  useEffect(() => {
    if (visible) {
      setStep('pick');
      setPdfUri(null);
      setPdfBase64(null);
      setExtractedText('');
      setIsExtracting(false);
    }
  }, [visible]);

  const handlePickPDF = useCallback(async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });
      if (result.canceled || !result.assets?.[0]) return;
      const file = result.assets[0];
      setPdfUri(file.uri);
      setStep('preview');
      setExtractedText('');
    } catch {
      showSnack(t.errors.pdfPickFailed);
    }
  }, [t, showSnack]);

  const handleExtractText = useCallback(async () => {
    if (!pdfUri) return;
    setIsExtracting(true);
    setStep('extracted');
    try {
      const b64 = await readAsStringAsync(pdfUri, {
        encoding: 'base64',
      });
      setPdfBase64(b64);
    } catch {
      setExtractedText(t.errors.pdfExtractFailed);
      setIsExtracting(false);
    }
  }, [pdfUri, t]);

  const handleWebViewMessage = useCallback((event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'text') {
        setExtractedText(data.text);
        setIsExtracting(false);
        if (!data.text) showSnack(t.errors.pdfNoText);
      } else if (data.type === 'error') {
        setExtractedText(t.errors.pdfExtractFailed + ': ' + data.error);
        setIsExtracting(false);
      }
    } catch {
      setIsExtracting(false);
    }
  }, [t, showSnack]);

  const parseAndImport = useCallback(() => {
    if (!extractedText.trim()) {
      showSnack(t.errors.pdfNoText);
      return;
    }
    const lines = extractedText.split('\n').map(l => l.trim()).filter(Boolean);
    const fullText = extractedText;
    const data: any = { template: 'classic' };

    const emailMatch = fullText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (emailMatch) data.email = emailMatch[0];

    const phoneMatch = fullText.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3,4}\)?[-.\s]?\d{3,4}[-.\s]\d{3,4}/);
    if (phoneMatch) data.phone = phoneMatch[0];

    if (lines.length > 0) data.fullName = lines[0];

    const summaryIdx = lines.findIndex(l =>
      /(?:summary|objective|professional|profile|about\s*me)/i.test(l)
    );
    if (summaryIdx !== -1 && summaryIdx + 1 < lines.length) {
      data.summary = lines[summaryIdx + 1];
    }

    const skillsIdx = lines.findIndex(l =>
      /(?:skills|competencies|expertise|technologies)/i.test(l)
    );
    if (skillsIdx !== -1) {
      const skillLines: string[] = [];
      for (let i = skillsIdx + 1; i < lines.length; i++) {
        if (/(?:experience|education|courses|education|work|languages)/i.test(lines[i]) && lines[i].length < 40) break;
        skillLines.push(lines[i]);
      }
      if (skillLines.length > 0) {
        data.skills = skillLines.join(', ').split(',').map(s => s.trim()).filter(s => s.length > 0);
      }
    }

    const workIdx = lines.findIndex(l =>
      /(?:work experience|employment|professional experience|work history)/i.test(l)
    );
    if (workIdx !== -1) {
      const expLines: string[] = [];
      for (let i = workIdx + 1; i < lines.length; i++) {
        if (/(?:education|courses|skills|training)/i.test(lines[i]) && lines[i].length < 40) break;
        expLines.push(lines[i]);
      }
      if (expLines.length > 0) {
        const jobMatch = expLines[0].match(/^(.+?)(?:\s*[-–|]\s*|\s+(?:at|in|@)\s+)(.+)$/);
        if (jobMatch) {
          data.workExperience = [{
            jobTitle: jobMatch[1],
            companyLocation: jobMatch[2],
            dateRange: '',
            mainTasks: expLines.slice(1).filter(l => l.length > 5).slice(0, 5),
          }];
        } else {
          data.workExperience = [{
            jobTitle: expLines[0],
            companyLocation: '',
            dateRange: '',
            mainTasks: expLines.slice(1).filter(l => l.length > 5).slice(0, 5),
          }];
        }
      }
    }

    if (!data.skills || data.skills.length === 0) data.skills = ['Communication', 'Teamwork'];
    if (!data.workExperience || data.workExperience.length === 0) {
      data.workExperience = [{ jobTitle: '', companyLocation: '', dateRange: '', mainTasks: [''] }];
    }
    if (!data.education) {
      data.education = [{ degree: '', institution: '', year: '', notes: '' }];
    }
    if (!data.summary) data.summary = fullText.slice(0, 200).trim();
    if (!data.courses) data.courses = [];
    if (!data.languages) {
      data.languages = [
        { name: 'Arabic', level: '' },
        { name: 'English', level: '' },
      ];
    }

    importCVData(data);
    showSnack(t.errors.importSuccess);
    onClose();
  }, [extractedText, importCVData, showSnack, t, onClose]);

  const renderExtractionWebView = () => {
    if (!pdfBase64 || !isExtracting) return null;
    const htmlWithData = PDF_HTML.replace('</script>',
      `setTimeout(function(){extractText('${pdfBase64}')},500);</script>`);
    return (
      <WebView
        ref={extractWebViewRef}
        source={{ html: htmlWithData }}
        style={{ width: 0, height: 0, opacity: 0 }}
        onMessage={handleWebViewMessage}
        javaScriptEnabled
        domStorageEnabled
        originWhitelist={['*']}
      />
    );
  };

  return (
    <Modal
      visible={visible}
      transparent={Platform.OS === 'android'}
      animationType="slide"
      presentationStyle={Platform.OS === 'ios' ? 'pageSheet' : 'overFullScreen'}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: theme.background,
          justifyContent: Platform.OS === 'ios' ? 'flex-start' : 'flex-end',
        }}
      >
        {Platform.OS === 'android' && (
          <TouchableOpacity
            style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
            activeOpacity={1}
            onPress={onClose}
          />
        )}

        <View
          style={[
            Platform.OS === 'ios'
              ? { flex: 1, backgroundColor: theme.background, paddingHorizontal: 24, paddingTop: 16 }
              : {
                  backgroundColor: theme.cardBackground,
                  borderTopLeftRadius: 28,
                  borderTopRightRadius: 28,
                  paddingHorizontal: 24,
                  paddingVertical: 24,
                  borderWidth: 1,
                  borderColor: theme.cardBorder,
                  borderBottomWidth: 0,
                  width: '100%',
                  maxHeight: '90%',
                },
          ]}
        >
          <SheetHeader
            title={t.pdfImporter.title}
            onClose={onClose}
            isRTL={isRTL}
            isDarkMode={isDarkMode}
            theme={theme}
            showGrabber
          />

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
            {step === 'pick' && (
              <View style={{ gap: 16 }}>
                <GlassicView cornerRadius={16} glassEffectStyle="regular" isDarkMode={isDarkMode}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handlePickPDF}
                    style={{
                      padding: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 12,
                    }}
                  >
                    <Ionicons name="document-text-outline" size={48} color={theme.accent} />
                    <Text style={{
                      color: theme.textPrimary,
                      fontFamily: getFontFamily(isRTL, 700),
                      fontSize: 16,
                      textAlign: 'center',
                    }}>
                      {t.pdfImporter.pickPDF}
                    </Text>
                    <Text style={{
                      color: theme.textSecondary,
                      fontFamily: getFontFamily(isRTL, 400),
                      fontSize: 13,
                      textAlign: 'center',
                    }}>
                      {t.pdfImporter.noFile}
                    </Text>
                  </TouchableOpacity>
                </GlassicView>
              </View>
            )}

            {step === 'preview' && pdfUri && (
              <View style={{ gap: 16 }}>
                <Text style={{
                  color: theme.textSecondary,
                  fontFamily: getFontFamily(isRTL, 600),
                  fontSize: 13,
                  marginBottom: 4,
                }}>
                  {t.pdfImporter.preview}
                </Text>
                <View style={{ height: 400, borderRadius: 16, overflow: 'hidden' }}>
                  <WebView
                    source={{ uri: pdfUri }}
                    style={{ flex: 1 }}
                    javaScriptEnabled
                    domStorageEnabled
                    originWhitelist={['*']}
                  />
                </View>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleExtractText}
                  style={{
                    backgroundColor: theme.accent,
                    borderRadius: 9999,
                    paddingVertical: 14,
                    flexDirection: isRTL ? 'row-reverse' : 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                  }}
                >
                  <Ionicons name="text-outline" size={18} color="#FFFFFF" />
                  <Text style={{ color: '#FFFFFF', fontFamily: getFontFamily(isRTL, 800), fontSize: 15 }}>
                    {t.pdfImporter.extracting}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {step === 'extracted' && (
              <View style={{ gap: 16 }}>
                {isExtracting ? (
                  <View style={{ alignItems: 'center', padding: 40, gap: 12 }}>
                    <ActivityIndicator size="large" color={theme.accent} />
                    <Text style={{
                      color: theme.textSecondary,
                      fontFamily: getFontFamily(isRTL, 600),
                      fontSize: 14,
                    }}>
                      {t.pdfImporter.extracting}
                    </Text>
                  </View>
                ) : (
                  <>
                    <GlassInput
                      label={t.pdfImporter.extractedText}
                      isDarkMode={isDarkMode}
                      isRTL={isRTL}
                      multiline
                      inlineMultiline
                      numberOfLines={10}
                      value={extractedText}
                      onChangeText={setExtractedText}
                      placeholder=""
                    />

                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={parseAndImport}
                      style={{
                        backgroundColor: theme.accent,
                        borderRadius: 9999,
                        paddingVertical: 14,
                        flexDirection: isRTL ? 'row-reverse' : 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                      }}
                    >
                      <Ionicons name="download-outline" size={18} color="#FFFFFF" />
                      <Text style={{ color: '#FFFFFF', fontFamily: getFontFamily(isRTL, 800), fontSize: 15 }}>
                        {t.pdfImporter.importToCV}
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            )}
          </ScrollView>
        </View>
      </View>
      {renderExtractionWebView()}
    </Modal>
  );
};
