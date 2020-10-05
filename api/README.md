docker exec -i mysql mysql -uroot -proot < schema.sql; -> create schema in mysql container
docker exec -ti api node config/populate.js -> populate db

Code d'erreur de l'API:

Auth: - Inscription:
401: email already used

endPoint:

/user =>

<!--                             POST METHOD                     -->

    personnalInfos: content-type -> json { infos: { ...fields } },

    uploadImage: content-type -> formData {
        username,
        isProfile => true si oui vide si non,
        imageId => id de l'image si modification
    },

    updateEmail: content-type json { email: string },

    updatePassword: content-type json { password: string, oldPassword: string },

    updateTags: json { tags: [ ...tag ]  } },

    like/:username: retour 200 -> already liked, 201 -> like added, 202 -> This is a match !
                    400 -> fail
