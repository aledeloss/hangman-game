export default function getDefinition({playingWord='sunrise'} = {}) {

  const language = "en_US";
  const apiURL = `https://api.dictionaryapi.dev/api/v2/entries/${language}/${playingWord}`;

  return (
    fetch(
        apiURL,
        {
        method: "GET",
        }
    )
    .then((response) => response.json())
    .then((response) => {
      const { data = [] } = response;
      return data;
    })
  )
};