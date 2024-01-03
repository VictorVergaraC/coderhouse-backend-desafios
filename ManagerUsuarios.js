const fs = require('fs');

class UserManager {
    constructor() {
        this.fileName = "Usuarios.json";
    }

    async createUser(name, lastName, age, course) {

        try {
            let currentData = await this.readFile();

            const newId = currentData ? currentData.length + 1 : 1

            const newObject = {
                id: newId,
                nombre: name,
                apellido: lastName,
                edad: age,
                curso: course
            };

            currentData = [...currentData, newObject];

            this.createFile(this.fileName, JSON.stringify(currentData));

            return newObject
        } catch (error) {
            console.log("Error al crear el usuario", error)
            return null
        }
    }

    async getUsuarios() {

        const arrData = await this.fileRead(this.fileName);
        if (arrData) {
            console.log("Datos registrados hasta ahora:")
            console.log(arrData)
            return;
        }
        console.log("No existen datos")
    }

    async readFile() {
        const arrData = await this.fileRead(this.fileName);
        if (arrData) {
            return arrData;
        }

        const created = await this.createFile(this.fileName, JSON.stringify([]))

        return this.readFile()

    }

    async createFile(strName, data) {
        try {
            fs.writeFileSync(strName, data)
            return true

        } catch (error) {
            console.error("Error al crear el archivo", error)
            return false
        }
    }

    // Valido que el archivo exista
    async fileExist(nombreArchivo) {
        try {
            await fs.promises.access(nombreArchivo, fs.constants.F_OK);
            return true;
        } catch (error) {
            return false;
        }
    }

    async fileRead(strFileName) {
        try {
            const exists = await this.fileExist(strFileName);

            if (exists) {
                const strData = await fs.promises.readFile(strFileName, "utf8");
                return JSON.parse(strData);
            }

            return null;
        } catch (error) {
            console.log("Error leyendo archivo:", error);
            return null;
        }
    }
}

// Uso
const userManager = new UserManager();

// userManager.createUser("Amaya", "Vergara", 19, "Psicología")
//     .then(result => {
//         if (result) {
//             console.log("Usuario creado:", result)
//             return
//         }
        
//     })

userManager.getUsuarios()
