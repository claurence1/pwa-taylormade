window.onload = function () {
	Promise.resolve(imagePaths).then(resImagePaths => {
		resImagePaths.forEach((imagePath, index) => {
			const image = document.createElement("rory");

			image.classList.add("full");
			image.classList.add("progressive");
			image.classList.add("replace");

			image.setAttribute("href", imagePath);

			image.innerHTML = `<img src="${imagePath[0]}" class="preview" loading="lazy" width="20" height="15" alt="preview"/>`

			const likeButton = document.createElement('button');
<<<<<<< HEAD
			likeButton.innerHTML = '♡';
			likeButton.classList.add("rounded-circle");
=======
			likeButton.innerHTML = '★';
>>>>>>> aab44cd50147f63adadacfbb5e58425b3a301486
			likeButton.classList.add("img");
			likeButton.setAttribute("id", `${imagePath[0]}`);

			const galleryImage = document.createElement('div');
			galleryImage.classList.add("gallery-image")
			const imgHolder = document.createElement('div');
			imgHolder.classList.add("img-holder");

			imgHolder.append(image);
			imgHolder.append(likeButton);

			galleryImage.append(imgHolder);

			document.getElementById("gallery").appendChild(galleryImage);

			likeButton.addEventListener("click", () => {
				fetch(`http://localhost:3000/favorite?image=${encodeURIComponent(imagePath[0])}` )
					.then((response) => {
						navigator.serviceWorker.ready.then(
							(serviceWorkerRegistration) => {
								serviceWorkerRegistration.pushManager.subscribe(
									{
										userVisibleOnly: true,
										applicationServerKey: "BNANPi8bmsrs4-wBjl_Et7dDewZWSHjYKKZuoDvZai1fvnhS282gY_PdYl38DXs4pS-FORfya5jkOs1dMkjpTHY"
									}
								).then(_subscription => {
									Notification.requestPermission(permission => {
										if (permission === "granted") {
											const notification = new Notification("Il est beau hein");
										}
									});
								});
							}
						);
					})
					.catch(console.error);
			})
		})
	})
		.catch(err => {
			const messageElement = document.createElement("p");
			messageElement.innerText = err;
			document.getElementById("gallery").appendChild(messageElement)
		})
};
