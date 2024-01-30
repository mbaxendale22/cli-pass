import { findByIdAndDelete } from "../db/items"
import { DBStatus, myPrompt } from "../utils"

export async function handleDeleteItem(itemId: number) {
    console.log('Are you sure you want to delete this item? Deletion cannot be undone')
    const userOpt = myPrompt('Choose Y or n: ').toUpperCase()
    if (userOpt !== 'Y') {
        return DBStatus.ERROR
    }
    const status = await findByIdAndDelete(itemId)
    if (status === DBStatus.ERROR) {
        console.log("Unable to delete item, check logs and try again later")
        return DBStatus.ERROR
    }
    console.log('** PASSWORD DELETED **')
    return DBStatus.SUCCESS

}
