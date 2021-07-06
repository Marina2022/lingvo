const AddEditUnitServices = {
   generateLevelsOptions(levelsList) {
      return levelsList.map((item) => ({ ...item, label: item.value }));
   },
};

export default AddEditUnitServices;
