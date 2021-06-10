//VARIABLES

const listaTweets = document.querySelector("#lista-tweets");

//EVENT LISTENERS

eventListeners();
function eventListeners(){
        //CUANDO SE ENVIA EL FORMULARIO
        document.querySelector("#formulario").addEventListener("submit",agregarTweet);
        //BORRAR TWEETS 
        listaTweets.addEventListener("click",borrarTweet);



}

//CONTENIDO CARGADO EN EL LOCAL STORAGE

document.addEventListener("DOMContentLoaded",localStorageListo);

//FUNCIONES


function agregarTweet(e){
        e.preventDefault();
        //LEER EL VALOR DEL TEXT AREA
        
        const tweet = document.querySelector("#tweet").value;
        
       //CREA EL BOTON DE ELIMINAR
        const botonBorrar = document.createElement("a");

        botonBorrar.classList = "borrar-tweet";
        botonBorrar.innerText = "X";
        
        //CREAR ELEMENTO Y AÑADIR CONTENIDO 

        const li = document.createElement("li");

        //AÑADE EL BOTON BORRAR
    
        li.innerText = tweet;
        li.appendChild(botonBorrar);

        //AÑADE EL TWEET
        listaTweets.appendChild(li); 

        //AÑADE TWEET al LS

        agregarTweetLocalStorage(tweet);

  


        
}
//BORRA EL TWEET DEL LI

function borrarTweet(e){
        e.preventDefault();
        if(e.target.className === "borrar-tweet"){
                e.target.parentElement.remove();

                //LLAMO A LA FUNCION A TRAVES DE TRAVERSING Y SELECCIONO EL CONTENIDO CON EL INNER
          borrarTweetLocalStorage(e.target.parentElement.innerText);    
         
}



}

//AGREGO A LOCAL STORAGE LOS TWEETS

function agregarTweetLocalStorage(tweet){
        let tweets;
        tweets=obtenerTweetsLocalStorage();
        //AÑADIR NUEVO TWEET

        tweets.push(tweet);

        //Convertir de string a arreglo con JSON
        localStorage.setItem("Tweets:",JSON.stringify(tweets));

}

//COMPRUEBA QUE HAYA ELEMENTOS EN LOCAL STORAGE

function obtenerTweetsLocalStorage(){

        let tweets;
        //REVISO LOS VALORES DE LS

        if(localStorage.getItem("Tweets:") === null){
                tweets = [];

        }else {
                //GUARDO EL TWEET EN ARREGLO CON JSON
                tweets = JSON.parse(localStorage.getItem("Tweets:"));

        }

        return tweets;
}

//MOSTRAR DATOS DE LOCAL STORAGE EN LA LISTA 

function localStorageListo(){
        let tweets;

        tweets = obtenerTweetsLocalStorage();

        tweets.forEach(function(tweet){

                
        
                //CREA EL BOTON DE ELIMINAR
                 const botonBorrar = document.createElement("a");
         
                 botonBorrar.classList = "borrar-tweet";
                 botonBorrar.innerText = "X";
                 
                 //CREAR ELEMENTO Y AÑADIR CONTENIDO 
         
                 const li = document.createElement("li");
         
                 //AÑADE EL BOTON BORRAR
             
                 li.innerText = tweet;
                 li.appendChild(botonBorrar);
         
                 //AÑADE EL TWEET
                
                 listaTweets.appendChild(li); 
        });
}

//ELIMINAR TWEET DE LS

function borrarTweetLocalStorage(tweet){
        let tweets,tweetBorrar;
        //ELIMINO EL STRING ULTIMO 
        tweetBorrar = tweet.substring(0,tweet.length-1);
        //LLAMO A LA FUNCION PARA TRAER LOS TWEETS DEL LS
        tweets = obtenerTweetsLocalStorage();
        //RECORRO EL ARREGLO "TWEETS" Y ELIMINO EL TWEET
        tweets.forEach(function(tweet,index){

                //COMPARO SI LOS TWEETS SON IGUALES Y LOS BORRA
                if(tweetBorrar===tweet){

                        tweets.splice(index,1);

                }

        });

        //ACTUALIZO EL ARREGLO DE TWEETS PARA QUE NO SE REEMPLAZE
        localStorage.setItem("Tweets:",JSON.stringify(tweets));

}   







