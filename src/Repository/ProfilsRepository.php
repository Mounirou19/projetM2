<?php

namespace App\Repository;

use App\Entity\Profils;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * Repository pour l'entité Profils
 * 
 * Ce repository gère les opérations de base de données pour les relations
 * utilisateur-média (favoris). Il peut contenir des requêtes pour récupérer
 * les favoris d'un utilisateur ou vérifier l'existence d'une relation.
 * 
 * @extends ServiceEntityRepository<Profils>
 * @author Mounirou
 * @version 1.0
 */
class ProfilsRepository extends ServiceEntityRepository
{
    /**
     * Constructeur du repository
     * 
     * @param ManagerRegistry $registry Registry Doctrine pour la gestion des entités
     */
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Profils::class);
    }

    //    /**
    //     * @return Profils[] Returns an array of Profils objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('p')
    //            ->andWhere('p.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('p.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Profils
    //    {
    //        return $this->createQueryBuilder('p')
    //            ->andWhere('p.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
