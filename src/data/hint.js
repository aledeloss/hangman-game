export const getHint = (word) => 
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`)
        .then(response => response.json())
        .then(response => response[0].meanings[0].definitions[0].definition)