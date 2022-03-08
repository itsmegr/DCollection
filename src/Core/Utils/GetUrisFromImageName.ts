import * as MediaLibrary from "expo-media-library";

interface imageType {
  fileName: string;
  uri: string;
}

const GetUrisFromImageName = async (names: string[]): Promise<imageType[]> => {
  let album = await MediaLibrary.getAlbumAsync("dcollection");
  //this will return null if no album exists
  if (album == null) {
    //this album does not exist
    console.log("album does not exist, means no images are stored till now");
    return [];
  }

  let data = await MediaLibrary.getAssetsAsync({ album: album });

  let tempUris: imageType[] = [];

  names.forEach((value, index) => {
    for (let asset of data.assets) {
      if (asset.filename === value)
        tempUris.push({ fileName: asset.filename, uri: asset.uri });
    }
  });

  // data.assets.forEach((value, index) => {
  //   //here need to filter the names from the names stored in db and get there uri and use that to show images
  //   // console.log(value.filename, value.uri);
  //   if (names.includes(value.filename)) {
  //     tempUris.push({ fileName: value.filename, uri: value.uri });
  //   }
  // });

  //fetching next page also if there
  while (data.hasNextPage) {
    data = await MediaLibrary.getAssetsAsync({
      album: album,
      after: data.endCursor,
    });
    names.forEach((value, index) => {
      for (let asset of data.assets) {
        if (asset.filename === value)
          tempUris.push({ fileName: asset.filename, uri: asset.uri });
      }
    });
  }

  return tempUris;
};

export default GetUrisFromImageName;
