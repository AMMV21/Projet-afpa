//initialisation des formulaires
let writerForm= document.getElementById('writerForm');

//initialisation des tableaux utilitaires
let tVerifWriterTab=[]; //verification doublons
let tWriterChecked =[]; //verification checbox

window.addEventListener('load',()=>{createWriterFilter(writerForm)});


/**
 * boucle qui lance la création du formulaire qui filtre les auteurs
 * @param {div} la div receptif
 */
function createWriterFilter(div)
{

    for(let i = 0; i<tliste_bd.length;i++)
    {
        addWriterFilter(div,i);
    }
}


/**
 * permet de créer dynamiquement le formulaire qui filtre les séries
 * @param {div} la div receptif 
 * @param {integer} l'indice d'itération 
 */
function addWriterFilter(div,indice)
{
    let newDiv=document.createElement('div');
    newDiv.setAttribute('class','divSerieItem');
    let checkItem = document.createElement('input');
    let labelItem = document.createElement('label');
    let valWriter = tliste_bd[indice][1].idAuteur;
    let writerName = auteurs.get(valWriter).nom;

    //on verifie si il n'y a pas de doublons
    if(!tVerifWriterTab.includes(writerName))
    {
        //on ajoute l'auteur dans le tableau des vérifications de doublons
        tVerifWriterTab.push(writerName);
         div.appendChild(newDiv);
         //on inclus les valeurs dans la checkbox
        checkItem.type = 'checkbox';
        checkItem.id=writerName;
        checkItem.value=writerName;
        // on inclus les valeurs dans le label
        labelItem.htmlFor =writerName;
        labelItem.textContent=writerName;
        newDiv.appendChild(checkItem);
        newDiv.appendChild(labelItem);
        newDiv.classList.add('hidden');

        //on ajoute la fonction à l'élément actuel
        checkItem.addEventListener('click', (e)=>{addEventCheckWriter(e)});

        //on rename le label pour enlever les virugules
        labelItem.textContent = labelItem.textContent.replaceAll(',',' ');
        }
}


/**
 * permet de récupérer les valeurs des checkbox et d'actualisé le tableau des filtres Serie
 * @param {event} l'evenement en cours
 */
function addEventCheckWriter(event)
{
    let item=event.srcElement;

    if(item.checked)
    {
        // si on coche on ajoute la valeur de la checbox dans le tableau
        tWriterChecked.push(item.value);
        removeAllChild(gallery);
        showBD(gallery);
    }
    else
    {
        //si on décoche, on retire la valeur du tableau
        tWriterChecked = arrayRemove(tWriterChecked, item.value);
        
        removeAllChild(gallery);
        showBD(gallery);
    }
}

/**
 * function permettant de retiré une valeur désiré du tableau
 * @param {Array<string>} Le tableau comportant la liste a modifié 
 * @param {string} le string que l'on souhaite retiré du tableau 
 * @returns 
 */
function arrayRemove(arr, value) 
{ 
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}

/**
 * Permet de vérifié le filtre Auteur
 * @param {string} Nom de l'auteur à filtré 
 * @returns Boolean true or false
 */
function checkWriterFilter(name)
{
    if(tWriterChecked.length === 0 || tWriterChecked.includes(name))
    {
        //si aucun filtre auteur OU si l'auteur actuel correspond au filtre
        return true;
    }
    return false;
}