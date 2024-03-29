const db = require('../models/')
const firebase = require('firebase')

// Initialize Firebase
// var config = {
//   apiKey: "AIzaSyD384SUrkibh_5ht78CLR_Fttc7k945sO8",
//   authDomain: "kanban-irianto.firebaseapp.com",
//   databaseURL: "https://kanban-irianto.firebaseio.com",
//   projectId: "kanban-irianto",
//   storageBucket: "kanban-irianto.appspot.com",
//   messagingSenderId: "231233131978"
// };
// firebase.initializeApp(config);

module.exports = {
	syncToFirebase: (req, res) => {
		// db.product.findAll({
		// 	include: [
    //     {
    //     model: db.brand,
    //   },
    //   {
    //     model: db.category
    //   }
    // ]
		// })
		// .then(result => {
		// 	const productsRef = firebase.database().ref().child(process.env.FIREBASE_DB)
		// 	result.map((data, idx) => {
		// 		productsRef.child(data.id).set({
		// 			id: data.id,
		// 			productName: data.productName,
		// 			price: data.price,
		// 			aladinPrice: data.aladinPrice,
		// 			displayPrice: data.displayPrice,
		// 			decreasePrice: data.decreasePrice,
		// 			brand: data.brand.brandName,
		// 			watching: 0,
		// 			brandLogo: data.brand.brandLogo
		// 		})
		// 	})

		// 	res.send({
		// 		message: 'writed to firebase',
		// 		data: result
		// 	})
		// })
    // .catch(err => console.log(err))

    db.pulsaPrice.findAll()
    .then(result => {
			const productsRef = firebase.database().ref().child(process.env.FIREBASE_DB)
			result.map((data, idx) => {
				productsRef.child(data.id).set({
					id: data.id,
					price: data.price,
					aladinPrice: data.aladinPrice,
					displayPrice: data.displayPrice,
					decreasePrice: data.decreasePrice,
					watching: 0,
				})
      })
      res.send({
				message: 'writed to firebase',
    		data: result.dataValues
        })
    })
    .catch(err => console.log(err))
	}
}
