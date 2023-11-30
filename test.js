
const cloudinary = require("cloudinary");

cloudinary.config({ 
    cloud_name: 'ahmed-zakys', 
    api_key: '657617286879229', 
    api_secret: 'AVjsexl9m9dmlnO3Th0iW2Sn5yQ' 
  });

// async function test () {
//   const images = await cloudinary.list_images(
//     {
//       folder: "complaintsImage",
//     },
//   );
// console.log(images)
//   for (const image of images) {
//     cloudinary.v2.api
//     .delete_image(image.public_id)
//     .then(console.log("coupons"));
//   }

// }
// test()

cloudinary.api.delete_resources_by_prefix('slides/', function(result){});
cloudinary.api.delete_resources_by_prefix('stores/', function(result){});
