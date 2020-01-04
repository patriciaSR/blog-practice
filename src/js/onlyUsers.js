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
  const completeInfoComments = [];
  comments.forEach((comment) => {
    const userCommentInfo = onlyUsersInfo.find((user) => user.userID === comment.userID);
    completeInfoComments.push({ comment, userCommentInfo });
  });

  return completeInfoComments;
}

module.exports = {
  getOnlyUsersIDs,
  getUserPostInfo,
  getUserCommentsInfo,
};
