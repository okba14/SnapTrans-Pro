// Initialize Hugging Face client
const HF_TOKEN = '// Replace with your token//'
const hf = new HuggingFaceInference(HF_TOKEN);

// Screenshot functionality
document.getElementById('screenshot').addEventListener('click', async () => {
  try {
    chrome.runtime.sendMessage({ type: 'CAPTURE_SCREENSHOT' }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Screenshot error:', chrome.runtime.lastError);
        alert(document.documentElement.lang === 'ar' 
          ? 'فشل التقاط الصورة. حاول مرة أخرى.'
          : 'Failed to capture screenshot. Please try again.');
      }
    });
  } catch (error) {
    console.error('Screenshot error:', error);
    alert(document.documentElement.lang === 'ar' 
      ? 'فشل التقاط الصورة. حاول مرة أخرى.'
      : 'Failed to capture screenshot. Please try again.');
  }
});

// Recording functionality
let mediaRecorder;
let recordedChunks = [];

document.getElementById('startRecord').addEventListener('click', async () => {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: { mediaSource: 'screen' }
    });
    
    mediaRecorder = new MediaRecorder(stream);
    
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };
    
    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      chrome.downloads.download({
        url: url,
        filename: `recording-${Date.now()}.webm`,
        saveAs: true
      });
      recordedChunks = [];
    };
    
    mediaRecorder.start();
    document.getElementById('startRecord').style.display = 'none';
    document.getElementById('stopRecord').style.display = 'block';
  } catch (error) {
    console.error('Recording error:', error);
    alert(document.documentElement.lang === 'ar' 
      ? 'فشل بدء التسجيل. حاول مرة أخرى.'
      : 'Failed to start recording. Please try again.');
  }
});

document.getElementById('stopRecord').addEventListener('click', () => {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
    document.getElementById('startRecord').style.display = 'block';
    document.getElementById('stopRecord').style.display = 'none';
  }
});

// Translation functionality
document.getElementById('translate').addEventListener('click', async () => {
  const text = document.getElementById('textToTranslate').value;
  const targetLang = document.getElementById('targetLang').value;
  const resultDiv = document.getElementById('translationResult');
  
  if (!text) {
    resultDiv.textContent = document.documentElement.lang === 'ar' 
      ? 'الرجاء إدخال نص للترجمة' 
      : 'Please enter text to translate';
    return;
  }
  
  resultDiv.textContent = document.documentElement.lang === 'ar' 
    ? 'جاري الترجمة...' 
    : 'Translating...';
  
  try {
    // For demonstration, using a simple translation API
    // Replace this with your actual Hugging Face API call
    const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);
    const data = await response.json();
    const translatedText = data[0][0][0];
    
    resultDiv.textContent = translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    resultDiv.textContent = document.documentElement.lang === 'ar' 
      ? 'فشلت الترجمة. حاول مرة أخرى.' 
      : 'Translation failed. Please try again.';
  }
});