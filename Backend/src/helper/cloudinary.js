const imagePublicUrlWithoutExtention = (imageUrl) => {
  try {
    // use this way or use another way to uncommnet the second line of code and commnet the first line of code.
    const imageUrlLastSegment = imageUrl.split("/").pop();

    // use another way
    // const pathSegments = imageUrl.split("/");
    // const lastElementOfSegment = pathSegments[pathSegments.length - 1];

    // removing the extention
    const withoutExtentionImagePath = imageUrlLastSegment.split(".")[0];
    return withoutExtentionImagePath;
  } catch (error) {
    throw error;
  }
};

module.exports = { imagePublicUrlWithoutExtention };
