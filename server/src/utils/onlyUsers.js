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
  const userPostInfo = onlyUsersInfo.find((user) => user.userID === userID);

  return userPostInfo;
}

function getUserCommentsInfo(comments, onlyUsersInfo) {
  comments.forEach((comment) => {
    const userCommentInfo = onlyUsersInfo.find((user) => user.userID === comment.userID);
    comment.userInfo = {
      userID: userCommentInfo.userID,
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
