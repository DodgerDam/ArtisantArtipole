<?php

namespace App\Controller;

use PDO;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ArtisantController extends AbstractController
{
    private $pdo;

    public function __construct(){
        $this->pdo = new PDO('mysql:host=localhost;dbname=artipole;port=3380;charset=utf8', 'artipole',  'artipole');
    }

    public function __destruct()
    {
        $this->pdo=null;
    }

    

    /**
     * @Route("/artisant", name="app_artisant")
     */
    public function index(): Response
    {
        return $this->render('artisant/index.html.twig', [
            'controller_name' => 'ArtisantController',
        ]);
    }

    /**
     * 
     * @route("/", name="home")
     */
    public function home()
    { 

        list($nbAdh,$nbfournisseurs)=$this->counter();

        return $this->render('artisant/home.html.twig',[
            'nbadh' =>$nbAdh[0]['cnt'],
            'fournisseurs' => $nbfournisseurs[0]['cnt_fournisseurs'],
            'rand_metiers'=>$this->RandMetier(),
            'selecteur_metiers'=> $this->SelectMetier(),
            'inspirations'=>$this->BlocInspi(),
            'logo_fournisseurs'=>$this->BlocFournisseurs(),
            // 'villes'=>$this->Autocomplete(),
        ]);
    }

    /**
     * 
     * @route("/inspirations", name="inspirations")
     * 
     */
    public function inspirations()
    {
        return $this->render('artisant/inspirations.html.twig',[
            'inspirations_page'=>$this->PageInspi(),
            'rand_inspirations' => $this->PageInspiRand(),
            'selecteur_metiers'=> $this->SelectMetier(),

        ]);
    }

        /**
     * 
     * @route("/listing_artisans", name="listing_artisans")
     * 
     */
    public function liste_adh()
    {
        list($nbAdh,$nbfournisseurs)=$this->counter();

        return $this->render('artisant/liste_adh.html.twig',[
            'nbadh' =>$nbAdh[0]['cnt'],
            'selecteur_metiers'=> $this->SelectMetier(),
            'rand_metiers'=>$this->RandMetier(),
            'card_artisan'=>$this-> CarteArtisans(),
        ]);
    }


    /**
     * compteurs des adhérents et des fournisseurs
     *
     * @return void
     */
    private function Counter(){

        // $pdo = new PDO('mysql:host=srvlinux;dbname=scabotheque;port=3306;charset=utf8', 'scabotheque',  'scabotheque');

        $adh_count = $this->pdo ->prepare("SELECT count(*) as cnt FROM artisans");
        $adh_count->execute();
        $nbAdh = $adh_count->fetchAll(PDO::FETCH_ASSOC);

        $founisseurs_count=$this->pdo->prepare("SELECT count(*) as cnt_fournisseurs FROM fournisseurs");
        $founisseurs_count->execute();
        $nbfournisseurs = $founisseurs_count->fetchAll(PDO::FETCH_ASSOC);

        return array ($nbAdh,$nbfournisseurs);
    }
    
    /**
     * Requete pour le sélecteur de la homepage
     *
     * @return void
     */
    private function SelectMetier(){
        // $pdo2 = new PDO('mysql:host=localhost;dbname=artipole;port=3380;charset=utf8', 'artipole',  'artipole');
        $selecteur_metiers=$this->pdo->prepare("SELECT id, nom FROM metiers");
        $selecteur_metiers->execute();
        $metiers_selecteur=$selecteur_metiers->fetchAll(PDO::FETCH_ASSOC);

        return $metiers_selecteur;
    }

    /**
     * Requete pour le bloc métiers de la homepage
     *
     * @return void
     */
    private function RandMetier(){ 
        // $pdo2 = new PDO('mysql:host=localhost;dbname=artipole;port=3380;charset=utf8', 'artipole',  'artipole');
        $rand_metiers=$this->pdo->prepare("SELECT m.*, p.images  
        FROM metiers m
        inner join photos_metiers pm on m.id= pm.id_metiers  
        inner join photos p on p.id=pm.id_photos
        ORDER BY RAND()
        ");
        $rand_metiers->execute();
        $metiers_rand=$rand_metiers->fetchAll(PDO::FETCH_ASSOC);

        return $metiers_rand;
    }

    /**
     * Requete pour le bloc inspiration de la homepage
     *
     * @return void
     */
    private function BlocInspi(){

        // $pdo2 = new PDO('mysql:host=localhost;dbname=artipole;port=3380;charset=utf8', 'artipole',  'artipole');
        $inspi=$this->pdo->query("SELECT m.id, m.nom, '' as img
        FROM metiers m
        where m.id != 6
        ");
        $inspi->execute();
        $inspirations= $inspi->fetchAll(PDO::FETCH_ASSOC);

        foreach($inspirations as &$valeur){
            $val=$valeur["id"];
            $inspi_img=$this->pdo->prepare("SELECT p.images
            from photos p
            inner join photos_inspirations pi2 on pi2.id_photos =p.id 
            where pi2.id_metiers = $val
            ");

            $inspi_img->execute();
            $inspi_img= $inspi_img->fetchAll(PDO::FETCH_ASSOC);

            $valeur["img"] = $inspi_img;

        }
        return $inspirations;
    }

    /**
     * Requete pour le bloc inspiration de la Homepage
     *
     * @return void
     */
    private function BlocFournisseurs(){

        // $pdo2 = new PDO('mysql:host=localhost;dbname=artipole;port=3380;charset=utf8', 'artipole',  'artipole');
        $logo_fournisseurs= $this->pdo->prepare("SELECT logo FROM fournisseurs");
        $logo_fournisseurs->execute();
        $fournisseurs=$logo_fournisseurs->fetchAll(PDO::FETCH_ASSOC);

        return $fournisseurs;
    }



    /**
     * Requete pour la page inspirations
     *
     * @return void
     */
    private function PageInspi(){

        // $pdo2 = new PDO('mysql:host=localhost;dbname=artipole;port=3380;charset=utf8', 'artipole',  'artipole');
        $inspi=$this->pdo->query("SELECT m.id, m.nom, '' as img
        FROM metiers m
        where m.id != 6
        ");
        $inspi->execute();
        $inspirations_page= $inspi->fetchAll(PDO::FETCH_ASSOC);

        foreach($inspirations_page as &$valeur){
            $val=$valeur["id"];
            $inspi_img=$this->pdo->prepare("SELECT p.images, pi2.legende
            from photos p
            inner join photos_inspirations pi2 on pi2.id_photos =p.id 
            where pi2.id_metiers = $val
            ");

            $inspi_img->execute();
            $inspi_img= $inspi_img->fetchAll(PDO::FETCH_ASSOC);

            $valeur["img"] = $inspi_img;

        }
        return $inspirations_page;

    }

      /**
     * Requete pour la page inspirations en random
     *
     * @return void
     */
    private function PageInspiRand(){

        // $pdo2 = new PDO('mysql:host=localhost;dbname=artipole;port=3380;charset=utf8', 'artipole',  'artipole');
        $inspi_rand=$this->pdo->query("SELECT p.id, p.images, pi2.legende
        from photos p 
        inner join photos_inspirations pi2 on p.id = pi2.id_photos 
        order by rand()
        limit 15
        ");
        $inspi_rand->execute();
        $inspirations_page_rand= $inspi_rand->fetchAll(PDO::FETCH_ASSOC);

        return $inspirations_page_rand;
    }
    private function CarteArtisans(){
        $card= $this->pdo->prepare("SELECT a.id_photo_artisan, a.nom, a.code_postal , a.ville , a.adresse , a.mail , a.telephone , p.images 
        from artisans a 
        inner join photos p on p.id  = a.id_photo_artisan ");
        $card->execute();
        $card_artisan = $card->fetchAll(PDO::FETCH_ASSOC);

        return $card_artisan;
    }

    /**
     * autocomplétion de l'input ville
     *
     * @return void
     */ 
    private function Autocomplete(){
        // $query = $this->pdo->prepare ("SELECT libelle from commune WHERE libele LIKE '%" . addslashes($_GET['Ville']) . "%'");
        $query = $this->pdo->prepare ("SELECT libelle from commune WHERE libelle LIKE '%dij%'");
        $query->execute();
 
        $tab[0] = "";
        while($ville= $query->fetchAll(PDO::FETCH_ASSOC)) {
 
            foreach($ville as $val)
	        $tab[] = $val;
        }          
        $villes = print json_encode($tab);
        return $villes;
    }

}