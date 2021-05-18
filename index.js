//parse text from <p> tags
const result = document.querySelectorAll("[data-screenreaderLanguage]");
const textArray = [];
result.forEach(e => textArray.push(e.innerText));

const language = document.querySelector("[data-screenreaderLanguage]").dataset.screenreaderlanguage;

//create file for Uppy
let mytextfile = new File([textArray], "mytextfile.txt", {type: "text/plain"});


//Create ELements
const buttonEl = document.getElementById("button_event");
const tmpGif = document.createElement("img");
const audioPlayer = document.createElement("AUDIO");

tmpGif.src = "loader.gif";
tmpGif.width = 100;
tmpGif.height = 100;
tmpGif.id = "tmpGif";

//Event listen
const runScript = async () => {
    try {
        buttonEl.parentNode.replaceChild(tmpGif, buttonEl);

        const resultPromise = await Robodog.upload([mytextfile], {
            waitForEncoding: true,
            params: {
                auth: { key: "YOUR_AUTH_KEY" },
                steps: {
                ":original": {
                    robot: "/upload/handle",
                },
                speach: {
                    use: ":original",
                    robot: "/text/speak",
                    provider: "aws",
                    target_language: language
                }
                }
            }
            });

        let audio_url = resultPromise.results[0].url;

        audioPlayer.setAttribute("src", audio_url);
        audioPlayer.setAttribute("controls", "controls");
        audioPlayer.setAttribute("autoplay", "autoplay");

        tmpGif.parentNode.replaceChild(audioPlayer, tmpGif);
    } catch (err) {
        console.error(err);
        tmpGif.parentNode.replaceChild(buttonEl, tmpGif);
    }
};
