export default function getDefinition(playingWord) {

  const language = "en_US";
  const apiURL = `https://api.dictionaryapi.dev/api/v2/entries/${language}/${playingWord}`;

  return (
    fetch(
      fetch(apiURL)
      .then(response => response.json())
      .then(response => {
        console.log('definition:', response)
        const newDefinition = response[0].meanings[0].definitions[0].definition
        return newDefinition;
      })
    )
  )
};