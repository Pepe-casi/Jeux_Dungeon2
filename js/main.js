//https://www.techiedelight.com/fr/add-css-property-javascript/
/*
Modélisation des objets
Cellule vide : 0
Joueur : 1
Monstre : 2
Trésor : 3
Mur : 4
*/
$serveur = 'http://localhost/Jeux_Dungeon/';
var tab = [];            // crée un array vide de longueur `M`

var tabMonstresX = []; //Liste des coordonnées en X des monstres
var tabMonstresY = []; // liste des coordonnées en Y des monstres

var tabTresorsX = []; //Liste des coordonnées en X des trésors
var tabTresorsY = []; //Liste des coordonnées en Y des trésors

var tabMursX = []; //Liste des coordonnées en X des murs
var tabMursY = []; //Liste des coordonnées en Y des murs

posX = Math.random() * 25;
var JoueurX;//Position horizontale du joueur
var JoueurY;//Position Verticale du joueur

var score = 0;
/*Modélisation du déplacement du joueur
Haut : 0 Se déplacer vers le haut
Gauche : 1 Se déplacer vers la gauche
Bas : 2  Se déplacer vers le bas
Droite : 3 Se déplacer vers la droite
*/
function deplaceJoueur(sens) {
    //Déplacement du Joueur
    //Vers le haut 0
    var x;
    var y;
    if (JoueurX > 0 && sens == 0) {

        JoueurX = JoueurX - 1;
        //Echec(JoueurX, JoueurY);
        if (!AutoriseDeplacementJoueur(JoueurX, JoueurY)) { JoueurX = JoueurX + 1; return; }
        tab[JoueurX][JoueurY] = 1;
        tab[JoueurX + 1][JoueurY] = 0;
        x = JoueurX + 1;
        y = JoueurY;
        deplaceMonstres();
        /**
         * Affichage du joueur
         */
        var obj0 = document.getElementById("c" + x + "-" + y);
        obj0.style.setProperty("background-image", "url('img/back.png')");
        var obj = document.getElementById("c" + JoueurX + "-" + JoueurY);
        obj.style.setProperty("background-image", "url('img/joueur.png')");
        if (Echec(JoueurX, JoueurY)) initDonjon();

    }
    //Vers le bas 2
    if (JoueurX < 14 && sens == 2) {

        JoueurX = JoueurX + 1;
        //Echec(JoueurX, JoueurY);
        if (AutoriseDeplacementJoueur(JoueurX, JoueurY)) {
            tab[JoueurX][JoueurY] = 1;
            tab[JoueurX - 1][JoueurY] = 0;
            x = JoueurX - 1;
            y = JoueurY;
            deplaceMonstres();
            /**
             * Affichage du joueur
             */
            var obj0 = document.getElementById("c" + x + "-" + y);
            obj0.style.setProperty("background-image", "url('img/back.png')");
            var obj = document.getElementById("c" + JoueurX + "-" + JoueurY);
            obj.style.setProperty("background-image", "url('img/joueur.png')");
            if (Echec(JoueurX, JoueurY)) initDonjon();
        } else
            JoueurX = JoueurX - 1;
    }
    //Vers la gauche 1
    if (JoueurY > 0 && sens == 1) {

        JoueurY = JoueurY - 1;
        if (Echec(JoueurX, JoueurY)) initDonjon();
        //Echec(JoueurX, JoueurY);
        if (!AutoriseDeplacementJoueur(JoueurX, JoueurY)) { JoueurY = JoueurY + 1; return; }
        tab[JoueurX][JoueurY] = 1;
        tab[JoueurX][JoueurY + 1] = 0;
        x = JoueurX;
        y = JoueurY + 1;
        deplaceMonstres();
        /**
 * Affichage du joueur
 */
        var obj0 = document.getElementById("c" + x + "-" + y);
        obj0.style.setProperty("background-image", "url('img/back.png')");
        var obj = document.getElementById("c" + JoueurX + "-" + JoueurY);
        obj.style.setProperty("background-image", "url('img/joueur.png')");
        if (Echec(JoueurX, JoueurY)) initDonjon();

    }
    //Vers la droite 3
    if (JoueurY < 24 && sens == 3) {

        JoueurY = JoueurY + 1;
        //Echec(JoueurX, JoueurY);
        if (Echec(JoueurX, JoueurY)) initDonjon();
        if (!AutoriseDeplacementJoueur(JoueurX, JoueurY)) { JoueurY = JoueurY - 1; return; }
        tab[JoueurX][JoueurY] = 1;
        tab[JoueurX][JoueurY - 1] = 0;
        x = JoueurX;
        y = JoueurY - 1;
        deplaceMonstres();
        /**
 * Affichage du joueur
 */
        var obj0 = document.getElementById("c" + x + "-" + y);
        obj0.style.setProperty("background-image", "url('img/back.png')");
        var obj = document.getElementById("c" + JoueurX + "-" + JoueurY);
        obj.style.setProperty("background-image", "url('img/joueur.png')");
        if (Echec(JoueurX, JoueurY)) initDonjon();

    }


    //Jeux gagné
    if (NombreDeTresorsDonjon(3) == 0) {
        score++;
        document.getElementById("score").innerHTML = "Score : " + score;
        initDonjon();
        //AfficheDonjon();
    }
    //AfficheDonjon();
}
/**
 * Déplacement aléatoire des monstres
 */
function deplaceMonstres() {
    //Déplacement suivant X
    var X = 0;
    var Y = 0;
    var sens = parseInt(Math.random() * 4);

    if (sens == 0)//Déplacement vers le haut
    {
        for (i = 0; i < tabMonstresX.length; i++) {
            if (tabMonstresX[i] > 0) {
                tabMonstresX[i] = tabMonstresX[i] - 1;
                //if (Echec(JoueurX, JoueurY)) initDonjon();
                if (AutoriseDeplacementMonstre(tabMonstresX[i], tabMonstresY[i])) {
                    tab[tabMonstresX[i]][tabMonstresY[i]] = 2;
                    tab[tabMonstresX[i] + 1][tabMonstresY[i]] = 0;
                    X = tabMonstresX[i] + 1;
                    Y = tabMonstresY[i];
                    var obj10 = document.getElementById("c" + X + "-" + Y);
                    obj10.style.setProperty("background-image", "url('img/black.png')");
                    var obj1 = document.getElementById("c" + tabMonstresX[i] + "-" + tabMonstresY[i]);
                    obj1.style.setProperty("background-image", "url('img/monstre.png')");
                } else
                    tabMonstresX[i] = tabMonstresX[i] + 1;
            }
        }
    }

    if (sens == 2) {//Déplacement vers le bas
        for (i = 0; i < tabMonstresX.length; i++) {
            if (tabMonstresX[i] < 14) {
                tabMonstresX[i] = tabMonstresX[i] + 1;
                //if (Echec(JoueurX, JoueurY)) initDonjon();
                if (AutoriseDeplacementMonstre(tabMonstresX[i], tabMonstresY[i])) {
                    tab[tabMonstresX[i]][tabMonstresY[i]] = 2;
                    tab[tabMonstresX[i] - 1][tabMonstresY[i]] = 0;
                    X = tabMonstresX[i] - 1;
                    Y = tabMonstresY[i];
                    var obj10 = document.getElementById("c" + X + "-" + Y);
                    obj10.style.setProperty("background-image", "url('img/black.png')");
                    var obj1 = document.getElementById("c" + tabMonstresX[i] + "-" + tabMonstresY[i]);
                    obj1.style.setProperty("background-image", "url('img/monstre.png')");
                } else
                    tabMonstresX[i] = tabMonstresX[i] - 1;
            }
        }
    }

    if (sens == 1) {//Déplacement vers la gauche
        for (i = 0; i < tabMonstresY.length; i++) {
            if (tabMonstresY[i] > 0) {
                tabMonstresY[i] = tabMonstresY[i] - 1;
                //if (Echec(JoueurX, JoueurY)) initDonjon();
                if (AutoriseDeplacementMonstre(tabMonstresX[i], tabMonstresY[i])) {
                    tab[tabMonstresX[i]][tabMonstresY[i]] = 2;
                    tab[tabMonstresX[i]][tabMonstresY[i] + 1] = 0;
                    X = tabMonstresX[i];
                    Y = tabMonstresY[i] + 1;
                    var obj10 = document.getElementById("c" + X + "-" + Y);
                    obj10.style.setProperty("background-image", "url('img/black.png')");
                    var obj1 = document.getElementById("c" + tabMonstresX[i] + "-" + tabMonstresY[i]);
                    obj1.style.setProperty("background-image", "url('img/monstre.png')");
                } else
                    tabMonstresY[i] = tabMonstresY[i] + 1;
            }
        }
    }

    if (sens == 3) {//Déplacement vers la droite
        for (i = 0; i < tabMonstresY.length; i++) {
            if (tabMonstresY[i] < 25) {
                tabMonstresY[i] = tabMonstresY[i] + 1;
                //if (Echec(JoueurX, JoueurY)) initDonjon();
                if (AutoriseDeplacementMonstre(tabMonstresX[i], tabMonstresY[i])) {
                    tab[tabMonstresX[i]][tabMonstresY[i]] = 2;
                    tab[tabMonstresX[i]][tabMonstresY[i] - 1] = 0;
                    X = tabMonstresX[i];
                    Y = tabMonstresY[i] - 1;
                    var obj10 = document.getElementById("c" + X + "-" + Y);
                    obj10.style.setProperty("background-image", "url('img/black.png')");
                    var obj1 = document.getElementById("c" + tabMonstresX[i] + "-" + tabMonstresY[i]);
                    obj1.style.setProperty("background-image", "url('img/monstre.png')");
                } else
                    tabMonstresY[i] = tabMonstresY[i] - 1;
            }
        }
    }
    // console.log(X + " " + Y);

}

function initDonjon() {
    tab = [];
    for (i = 0; i < 15; i++) {
        var tab0 = [25];
        for (j = 0; j < 25; j++) {
            tab0[j] = 0;
            var obj1 = document.getElementById("c" + i + "-" + j);
            obj1.style.setProperty("background-color", "black");
            obj1.style.setProperty("background-image", "url('img/black.png')");
        }
        tab[i] = tab0;
    }
    //init Elements
    //Joueur 
    //console.log(tab);
    tab[1][1] = 1;
    JoueurX = 1;
    JoueurY = 1;
    //Monstres
    tab[4][4] = 2;
    tab[11][5] = 2;
    tabMonstresX[0] = 4;
    tabMonstresY[0] = 4;
    tabMonstresX[1] = 11;
    tabMonstresY[1] = 5;
    //Trésors
    tab[11][8] = 3;
    tab[12][11] = 3;
    tabTresorsX[0] = 11;
    tabTresorsY[0] = 8;
    tabTresorsX[1] = 12;
    tabTresorsY[1] = 5;
    //Murs
    tab[9][14] = 4;
    tab[12][9] = 4;
    tabMursX[0] = 9;
    tabMursY[0] = 14;
    tabMursX[1] = 12;
    tabMursY[1] = 9;

    AfficheDonjon();
}

//Affichage initDonjon
function AfficheDonjon() {

    for (i = 0; i < 15; i++) {
        for (j = 0; j < 25; j++) {
            var obj1 = document.getElementById("c" + i + "-" + j);
            //Affiche vide
            if (tab[i][j] == 0) {
                obj1.style.setProperty("background-color", "black");
            }
            if (tab[i][j] == 2) {

                obj1.style.setProperty("background-image", "url('img/black.png')");
            }
            //Affiche joueur
            if (tab[i][j] == 1) {
                obj1.style.setProperty("background-image", "url('img/joueur.png')");
                obj1.style.setProperty("background-color", "black");
            }

            //Affiche monstres
            if (tab[i][j] == 2) {
                obj1.style.setProperty("background-image", "url('img/monstre.png')");
                obj1.style.setProperty("background-color", "black");
            }

            //Affiche trésor
            if (tab[i][j] == 3) {
                obj1.style.setProperty("background-image", "url('img/tresor.png')");
                obj1.style.setProperty("background-color", "black");
            }

            //Affiche mur
            if (tab[i][j] == 4) {
                obj1.style.setProperty("background-image", "url('img/mur.png')");
                obj1.style.setProperty("background-color", "black");
            }

        }
    }
    //  document.getElementById("score").innerHTML = "Score : " + score;
}

function NombreDeTresorsDonjon(tresor) {
    var nbTresors = 0;
    for (i = 0; i < 15; i++) {
        var str = i + ": ";
        for (j = 0; j < 25; j++) {
            if (tab[i][j] == tresor)
                nbTresors++;
        }
    }
    return nbTresors;
}

function AutoriseDeplacementMonstre(_NewPosX, _NewPosY) {
    //Saut des murs
    if (tabMursX.indexOf(_NewPosX) != -1 && tabMursY.indexOf(_NewPosY) != -1) {
        for (i = 0; i < tabMursX.length; i++) {
            if (tabMursX[i] == _NewPosX && tabMursY[i] == _NewPosY)
                return false;
        }
    }
    //Saut des Trésors
    /* if (tabTresorsX.indexOf(_NewPosX) != -1 && tabTresorsY.indexOf(_NewPosY) != -1) {
         for (i = 0; i < tabMursX.length; i++) {
             if (tabTresorsX[i] == _NewPosX && tabTresorsY[i] == _NewPosY)
                 return false;
         }
     }*/

    return true;
}

function AutoriseDeplacementJoueur(_NewPosX, _NewPosY) {
    //Saut des murs
    if (tabMursX.indexOf(_NewPosX) != -1 && tabMursY.indexOf(_NewPosY) != -1) {
        for (i = 0; i < tabMursX.length; i++) {
            if (tabMursX[i] == _NewPosX && tabMursY[i] == _NewPosY)
                return false;
        }
    }

    return true;
}
function Echec(_NewPosX, _NewPosY) {
    //Saut des monstre
    if (tabMonstresX.indexOf(_NewPosX) != -1 && tabMonstresY.indexOf(_NewPosY) != -1) {

        for (i = 0; i < tabMonstresX.length; i++) {
            if (tabMonstresX[i] == _NewPosX && tabMonstresY[i] == _NewPosY) {
                score = 0
                document.getElementById("score").innerHTML = "<span style='color:red;font-size:20px;font-weight:bold;'>GAME OVER</span>";
                return true;
            }

        }
    }

    return false;
}

function startGame() {
    document.getElementById("score").innerHTML = "Score : " + 0;
    initDonjon();
}

