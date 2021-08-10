export default function MakeUsersDb({ makeDb }) {

  return Object.freeze({
    findByGoogleId,
    findByGoogleIdAndUpdateProfilePic,
    remove
  })

  async function findByGoogleId(googleId) {
    const db = await makeDb()
    const result = await db.collection('users').find({ googleId: googleId })
    const found = await result.toArray()
    if (found.length === 0) {
      return null
    }
    const settings = found[0]
    return settings
  }

  async function findByGoogleIdAndUpdateProfilePic({ googleId, photoURL }) {
    const db = await makeDb()
    const result = await db.collection('users')
      .findOneAndUpdate(
        { googleId },
        { $set: { photoURL } },
        { returnOriginal: false }
      )

    return { photoURL: result.value.photoURL }
  }

  async function remove(_id) {
    const db = await makeDb()
    const result = await db.collection('users').deleteOne({ _id })
    return result.deletedCount
  }


}