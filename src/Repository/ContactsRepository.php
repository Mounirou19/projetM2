<?php

namespace App\Repository;

use App\Entity\Contacts;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * Repository pour l'entité Contacts
 * 
 * Ce repository gère les opérations de base de données pour les messages
 * de contact. Il peut contenir des requêtes pour filtrer par statut,
 * trier par date ou rechercher par expéditeur.
 * 
 * @extends ServiceEntityRepository<Contacts>
 * @author Mounirou
 * @version 1.0
 */
class ContactsRepository extends ServiceEntityRepository
{
    /**
     * Constructeur du repository
     * 
     * @param ManagerRegistry $registry Registry Doctrine pour la gestion des entités
     */
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Contacts::class);
    }

    //    /**
    //     * @return Contacts[] Returns an array of Contacts objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('c')
    //            ->andWhere('c.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('c.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Contacts
    //    {
    //        return $this->createQueryBuilder('c')
    //            ->andWhere('c.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
