<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20251212103537 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE contacts CHANGE message message LONGTEXT NOT NULL, CHANGE created_at created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE medias CHANGE image_url image_url VARCHAR(255) DEFAULT NULL, CHANGE score score INT NOT NULL');
        $this->addSql('ALTER TABLE profils DROP FOREIGN KEY fk_media');
        $this->addSql('ALTER TABLE profils DROP FOREIGN KEY fk_user');
        $this->addSql('DROP INDEX fk_media ON profils');
        $this->addSql('DROP INDEX fk_user ON profils');
        $this->addSql('ALTER TABLE users ADD created_at DATETIME NOT NULL, ADD last_login_at DATETIME DEFAULT NULL, ADD failed_login_attempts INT NOT NULL, ADD locked_until DATETIME DEFAULT NULL, ADD last_login_ip VARCHAR(45) DEFAULT NULL, ADD rgpd_consent TINYINT(1) NOT NULL, ADD rgpd_consent_date DATETIME DEFAULT NULL, ADD email_verification_token VARCHAR(255) DEFAULT NULL, ADD is_email_verified TINYINT(1) NOT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_1483A5E9E7927C74 ON users (email)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE contacts CHANGE message message TEXT NOT NULL, CHANGE created_at created_at DATETIME NOT NULL');
        $this->addSql('DROP INDEX UNIQ_1483A5E9E7927C74 ON users');
        $this->addSql('ALTER TABLE users DROP created_at, DROP last_login_at, DROP failed_login_attempts, DROP locked_until, DROP last_login_ip, DROP rgpd_consent, DROP rgpd_consent_date, DROP email_verification_token, DROP is_email_verified');
        $this->addSql('ALTER TABLE medias CHANGE image_url image_url VARCHAR(255) NOT NULL, CHANGE score score INT DEFAULT NULL');
        $this->addSql('ALTER TABLE profils ADD CONSTRAINT fk_media FOREIGN KEY (id_media) REFERENCES medias (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE profils ADD CONSTRAINT fk_user FOREIGN KEY (id_user) REFERENCES users (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('CREATE INDEX fk_media ON profils (id_media)');
        $this->addSql('CREATE INDEX fk_user ON profils (id_user)');
    }
}
