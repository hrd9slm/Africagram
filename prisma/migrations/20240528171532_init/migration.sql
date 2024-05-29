-- DropIndex
DROP INDEX `Aime_post_id_fkey` ON `aime`;

-- DropIndex
DROP INDEX `Aime_utilisateur_id_fkey` ON `aime`;

-- DropIndex
DROP INDEX `Commentaire_post_id_fkey` ON `commentaire`;

-- DropIndex
DROP INDEX `Commentaire_utilisateur_id_fkey` ON `commentaire`;

-- DropIndex
DROP INDEX `Follower_follower_id_fkey` ON `follower`;

-- DropIndex
DROP INDEX `Publication_utilisateur_id_fkey` ON `publication`;

-- AlterTable
ALTER TABLE `publication` ADD COLUMN `image_url` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Profil` ADD CONSTRAINT `Profil_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Utilisateur`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Publication` ADD CONSTRAINT `Publication_utilisateur_id_fkey` FOREIGN KEY (`utilisateur_id`) REFERENCES `Utilisateur`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Aime` ADD CONSTRAINT `Aime_utilisateur_id_fkey` FOREIGN KEY (`utilisateur_id`) REFERENCES `Utilisateur`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Aime` ADD CONSTRAINT `Aime_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Publication`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Commentaire` ADD CONSTRAINT `Commentaire_utilisateur_id_fkey` FOREIGN KEY (`utilisateur_id`) REFERENCES `Utilisateur`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Commentaire` ADD CONSTRAINT `Commentaire_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Publication`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Follower` ADD CONSTRAINT `Follower_follower_id_fkey` FOREIGN KEY (`follower_id`) REFERENCES `Utilisateur`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
