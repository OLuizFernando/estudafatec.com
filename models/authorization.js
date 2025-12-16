function can(userFeatures, requiredFeature) {
  return userFeatures.includes(requiredFeature) ? true : false;
}

const authorization = {
  can,
};

export default authorization;
