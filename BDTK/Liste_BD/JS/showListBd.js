//ajout de la div receptrice de la création
let gallery = document.getElementById('bdGallery');


//on effectue l'action au chargement de la page
window.addEventListener('load',(()=>{showBD(gallery)}));

/**
 * la fonction permet d'afficher la liste des BD
 * @param {div}  la div dans laquelle ajouter les nouvelle balises 
 */
function showBD(div,title='',exact)
{

    //on créer autant de div qu'on a de BD (30 pour le projet)
    for(let i = 0; i<tliste_bd.length; i++)
    {
        createBD(div,i,title,exact)   
    }
    //a la fin de la boucle, si aucune div n'a était créer, on informe du manque de BD
    if(!div.hasChildNodes())
    {
        let noneBd = document.createElement('span');
        div.appendChild(noneBd);
        noneBd.textContent = "Aucune BD n'a été trouvée...";
        noneBd.setAttribute('class','error');
    }
}

/**
 * Permet de supprimer tous les enfants d'une div
 * @param {div} la div dans lesquelle on supprime le div enfants 
 */
function removeAllChild(div)
{
    while(div.firstChild)
    {
        div.removeChild(div.lastChild);
    }
}

/**
 * permet de créer un nombre i de div "BD"
 * @param {div} la div receptrice des nouvelles div 
 * @param {Int} l'indice actuelle 
 */
function createBD(div,indice,title,exact)
{
    //initialisation des div à créer
    let newDiv = document.createElement('div');
    let newImg = document.createElement('img');
    let newSerieTitle = document.createElement('h3');
    let newTitle = document.createElement('h2');
    let newWriter = document.createElement('h4');

    newDiv.setAttribute('class','bdDiv');
    
    //on récupere les infos des BD
    let titleVolume = tliste_bd[indice][1].titre;
    let numberVolume = tliste_bd[indice][1].numero;
    let valSerie = tliste_bd[indice][1].idSerie;
    let titleSerie = series.get(valSerie).nom;
    let valAuthor = tliste_bd[indice][1].idAuteur;
    let nameAuthor = auteurs.get(valAuthor).nom;

    if(checkSerieFilter(titleSerie))
    {
        if(checkWriterFilter(nameAuthor))
        {
            if(exact)
            {
                //si il y au moin un livre avec l'appellation exact
                if(checkExactTitleFilter(titleVolume,title))
                {
                    //initialisation image
                    newImg.src=`./Ressources/albumsMini/${titleSerie}-${numberVolume}-${titleVolume}.jpg`;
                    
                    //on change le nom de la balise titre
                    newTitle.textContent = titleVolume;
                    newSerieTitle.textContent = titleSerie;
                    newWriter.textContent = nameAuthor;

                    div.appendChild(newDiv);
                    newDiv.appendChild(newTitle);
                    newDiv.appendChild(newSerieTitle);
                    newDiv.appendChild(newWriter);
                    newDiv.appendChild(newImg); 

                }
            }
            
            else if(checkTitleFilter(div,titleVolume,title))
            {
                //initialisation image
                newImg.src=`./Ressources/albumsMini/${titleSerie}-${numberVolume}-${titleVolume}.jpg`;
                newImg.alt=`couverture ${titleVolume}`;
                
                //on change le nom de la balise titre
                newTitle.textContent = titleVolume;
                newSerieTitle.textContent = titleSerie;
                newWriter.textContent = nameAuthor.replaceAll(',',' ');

                div.appendChild(newDiv);
                
                newDiv.appendChild(newTitle);
                newDiv.appendChild(newSerieTitle);
                newDiv.appendChild(newWriter);
                newDiv.appendChild(newImg); 

                //lors du clique on cache la popup qui contiens le form si elle est affiché
                //on affiche ensuite la popup des détails de la BD 
                //on affiche les détails de la BD
                //on floute la page en dehors des popup
                newDiv.addEventListener('click',()=>{
                    if(copyItemPopup.style.display !== 'none')
                    {
                        copyItemPopup.style.display = 'none';
                    }                    
                    bdPopup.style.display = 'flex';
                    showDetails(bdPopupContent,titleVolume,titleSerie,nameAuthor,numberVolume);
                    blurAll();
                })
            } 
        }
        
    }

    
} 

