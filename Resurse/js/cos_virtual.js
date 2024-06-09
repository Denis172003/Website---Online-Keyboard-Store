window.addEventListener("load", function () {
	let prod_sel = localStorage.getItem("cos_virtual");
  
	if (prod_sel) {
	  let vect_ids = prod_sel.split(",");
	  fetch("/produse_cos", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		mode: 'cors',
		cache: 'default',
		body: JSON.stringify({ ids_prod: vect_ids })
	  })
	  .then(function (response) {
		if (!response.ok) {
		  throw new Error('Network response was not ok');
		}
		return response.json();
	  })
	  .then(function (objson) {
		console.log(objson); // objson is the vector of products
		let main = document.getElementsByTagName("main")[0];
		let btn = document.getElementById("cumpara");
  
		for (let prod of objson) {
		  let article = document.createElement("article");
		  article.classList.add("cos-virtual");
		  
		  let h2 = document.createElement("h2");
		  h2.innerHTML = prod.nume;
		  article.appendChild(h2);
  
		  let imagine = document.createElement("img");
		  imagine.src = "/resurse/imagini/produse/" + prod.imagine;
		  article.appendChild(imagine);
  
		  let descriere = document.createElement("p");
		  descriere.innerHTML = prod.descriere + " <b>Pret:</b>" + prod.pret;
		  article.appendChild(descriere);
		  
		  main.insertBefore(article, btn);
		}
	  })
	  .catch(function (err) {
		console.log('Fetch error:', err);
	  });
  
	  document.getElementById("cumpara").onclick = function () {
		prod_sel = localStorage.getItem("cos_virtual");
		if (prod_sel) {
		  let vect_ids = prod_sel.split(",");
		  fetch("/cumpara", {
			method: "POST",
			headers: { 'Content-Type': 'application/json' },
			mode: 'cors',
			cache: 'default',
			body: JSON.stringify({ ids_prod: vect_ids })
		  })
		  .then(function (response) {
			if (!response.ok) {
			  throw new Error('Network response was not ok');
			}
			return response.text();
		  })
		  .then(function (raspunsText) {
			console.log(raspunsText);
			if (raspunsText) {
			  localStorage.removeItem("cos_virtual");
			  let p = document.createElement("p");
			  p.innerHTML = raspunsText;
			  document.getElementsByTagName("main")[0].innerHTML = "";
			  document.getElementsByTagName("main")[0].appendChild(p);
			}
		  })
		  .catch(function (err) {
			console.log('Fetch error:', err);
		  });
		}
	  };
	} else {
	  document.getElementsByTagName("main")[0].innerHTML = "<p>Nu aveti nimic in cos!</p>";
	}
  });
  