const result = document.querySelectorAll('[data-screenreaderLanguage]')
const textArray = []
result.forEach(e => textArray.push(e.innerText))

const language = document.querySelector('[data-screenreaderLanguage]').dataset.screenreaderlanguage

let mytextfile = new File([textArray], 'mytextfile.txt', {type: 'text/plain'})

const buttonEl = document.getElementById('button_event')
const tmpGif = document.createElement('img')
const audioPlayer = document.createElement('AUDIO')

tmpGif.src = 'loader.gif'
tmpGif.width = 100
tmpGif.height = 100
tmpGif.id = 'tmpGif'

const runScript = async () => { 
  buttonEl.parentNode.replaceChild(tmpGif, buttonEl)
  
  const Uppy = Robodog.upload([mytextfile], {
    waitForEncoding: true,
    params: {
      auth: { key: '6f9ece25ada84dde9bbcfdcb652b5b6a' },
      steps: {
      ':original': {
        robot: '/upload/handle',
      },
      speach: {
        use: ':original',
        robot: '/text/speak',
        provider: 'aws',
        target_language: language
        }
        }
      }
    }).then((bundle) => {
      let audio_url = bundle.results[0].url

      audioPlayer.setAttribute('src', audio_url)
      audioPlayer.setAttribute('controls', 'controls')
      audioPlayer.setAttribute('autoplay', 'autoplay')

      tmpGif.parentNode.replaceChild(audioPlayer, tmpGif)
    }).catch((error) => {
      console.error(error)
      tmpGif.parentNode.replaceChild(buttonEl, tmpGif)
      })
    }
