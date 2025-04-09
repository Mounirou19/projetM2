<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241104141356 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE medias ADD score INT DEFAULT NULL');
        $this->addSql('ALTER TABLE profils DROP FOREIGN KEY fk_media');
        $this->addSql('ALTER TABLE profils DROP FOREIGN KEY fk_user');
        $this->addSql('DROP INDEX fk_media ON profils');
        $this->addSql('DROP INDEX fk_user ON profils');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE medias DROP score');
        $this->addSql('ALTER TABLE profils ADD CONSTRAINT fk_media FOREIGN KEY (id_media) REFERENCES medias (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE profils ADD CONSTRAINT fk_user FOREIGN KEY (id_user) REFERENCES users (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('CREATE INDEX fk_media ON profils (id_media)');
        $this->addSql('CREATE INDEX fk_user ON profils (id_user)');
    }
}
