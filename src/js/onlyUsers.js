function getOnlyUsersArray(post, comments) {
  const onlyUserIDsSet = new Set();

  onlyUserIDsSet.add(post[0].userID);

  comments.forEach((comment) => {
    onlyUserIDsSet.add(comment.userID);
  });
  const onlyUserIDsArray = Array.from(onlyUserIDsSet);

  return onlyUserIDsArray;
}

module.exports = getOnlyUsersArray;
