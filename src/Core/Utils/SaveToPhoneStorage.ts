import * as MediaLibrary from "expo-media-library";
/*
    This function will save the images to the pictures/dcollection folder
    From here we can get the assets name so they can be stored in db
*/
const SaveToPhoneStorage = async (bills: string[]): Promise<string[]> => {
  return new Promise<string[]>(async (resolve, reject) => {
    try {
      let billNames = [];

      if (bills.length == 0) {
        resolve([]);
        return;
      }

      // Remember, here item is a file uri which looks like this. file://..
      const permission = await MediaLibrary.requestPermissionsAsync();
      if (!permission.granted) {
        reject("Need Storage permission to save file");
        return;
      }

      //get the asset
      let album = await MediaLibrary.getAlbumAsync("dcollection");
      if (album == null) {
        //this album does not exist
        const asset1 = await MediaLibrary.createAssetAsync(bills[0]);
        album = await MediaLibrary.createAlbumAsync(
          "dcollection",
          asset1,
          false
        );
        billNames.push(asset1.filename);

        for (let i = 1; i < bills.length; i++) {
          const asset2 = await MediaLibrary.createAssetAsync(bills[i]);
          await MediaLibrary.addAssetsToAlbumAsync(asset2, album, false);
          billNames.push(asset2.filename);
        }
      } else {
        for (let i = 0; i < bills.length; i++) {
          const asset2 = await MediaLibrary.createAssetAsync(bills[i]);
          let data = await MediaLibrary.addAssetsToAlbumAsync(
            asset2,
            album,
            false
          );
          billNames.push(asset2.filename);
        }
      }

    
      resolve(billNames);
      return;
    } catch (error) {
      reject(error);
    }
  });
};


export default SaveToPhoneStorage;