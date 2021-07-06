const NewTopicServices = {
   generateLanguagesOptions(languagesList) {
      return languagesList.map((item) => ({ ...item, label: item.value }));
   },
};

export default NewTopicServices;
