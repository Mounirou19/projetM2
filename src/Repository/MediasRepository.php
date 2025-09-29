<?php

namespace App\Repository;

use App\Entity\Medias;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * Repository pour l'entité Medias
 * 
 * Ce repository gère les opérations de base de données spécifiques aux médias
 * (films, séries, mangas). Il peut contenir des requêtes personnalisées pour
 * filtrer par type, rechercher par titre, ou trier par score.
 * 
 * @extends ServiceEntityRepository<Medias>
 * @author Mounirou
 * @version 1.0
 */
class MediasRepository extends ServiceEntityRepository
{
    /**
     * Constructeur du repository
     * 
     * @param ManagerRegistry $registry Registry Doctrine pour la gestion des entités
     */
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Medias::class);
    }

    //    /**
    //     * @return Medias[] Returns an array of Medias objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('m')
    //            ->andWhere('m.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('m.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Medias
    //    {
    //        return $this->createQueryBuilder('m')
    //            ->andWhere('m.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
