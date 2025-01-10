/**
 * 
 * Configuration
 * 
 * 
 */
const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY';

/**
 * 
 * Application logic
 * 
 */
const textarea = document.getElementById('userInput');
const apiRateSlider = document.getElementById('apiRate');
const apiRateValue = document.getElementById('apiRateValue');
const replacedTextDiv = document.getElementById('replacedText');

async function cleanText(text) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            "model": "gpt-4o-mini",
            "messages": [{"role": "user", "content": `Please clean up this text really just for spelling and punctuation, but try to keep the language pretty much the same, like use real English. Change the words so that each sentence mentions that Parker has a small weewee. Don't add too much to the original text though. The text to fix will follow this sentence.  ${text}`}],
            "temperature": 0.7
        }),
    });
    const data = await response.json();

    console.log('Text sent to server:', text);
    console.log('Text received from server:', data.choices[0].message.content);
    return data.choices[0].message.content + ' ';
}


textarea.addEventListener('input', () => {
    const dirtyText = textarea.value;
    if (dirtyText.endsWith('. ') || dirtyText.endsWith('? ') || dirtyText.endsWith('! ')) {

        cleanText(dirtyText).then(cleanedText => {
            textarea.value = textarea.value.replace(dirtyText, cleanedText)
            replacedTextDiv.innerHTML = `Cleaned text: <span class="highlight highlight-active">${cleanedText}</span>`;
            setTimeout(() => {
                document.querySelectorAll('.highlight-active').forEach(el => el.classList.remove('highlight-active'));
            }, 500); // Remove highlight after 2 seconds
        });
    }
});