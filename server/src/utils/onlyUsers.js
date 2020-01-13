function getOnlyUsersIDs(post, comments) {
  const onlyUserIDsSet = new Set();

  onlyUserIDsSet.add(post.userID);

  comments.forEach((comment) => {
    onlyUserIDsSet.add(comment.userID);
  });
  const onlyUserIDsArray = Array.from(onlyUserIDsSet);

  return onlyUserIDsArray;
}

function getUserPostInfo(userID, onlyUsersInfo) {
  const userPostInfo = onlyUsersInfo.find((user) => user._id === userID);

  return userPostInfo;
}

function getUserCommentsInfo(comments, onlyUsersInfo) {
  comments.forEach((comment) => {
    const userCommentInfo = onlyUsersInfo.find((user) => user._id.toString() === comment.userID.toString());
    comment.userInfo = {
      userID: userCommentInfo._id,
      username: userCommentInfo.username,
      image: userCommentInfo.image,
    };
  });

  return comments;
}

module.exports = {
  getOnlyUsersIDs,
  getUserPostInfo,
  getUserCommentsInfo,
};
