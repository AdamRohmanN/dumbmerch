# dumbmerch-server

//paket yang dipakai
```javascript
npm i express
npm i mysql2
npm i sequelize
npm i sequelize-cli
```

//akan menghasilkan folder: config, migrations, models, & seeders
```npx sequelize init```

//membuat tabel ke migrations & models
```npx sequelize-cli model:generate --name user --attributes name:string,email:string,password:string,status:string```

//membuat database berdasarkan config
```npx sequelize-cli db:create```

//memindahkan tabel ke database berdasarkan migrations & models
```npx sequelize-cli db:migrate```

//mengembalikan migrations
```npx sequelize-cli db:migrate:undo //for recent migration```
```npx sequelize-cli db:migrate:undo:all //all migration```

//menghapus database
```npx sequelize-cli db:drop```

//daftar tabel (selalu buat tabel orang tua terlebih dahulu)
```npx sequelize-cli model:generate --name user --attributes name:string,email:string,password:string,status:string```
```npx sequelize-cli model:generate --name profile --attributes phone:string,gender:string,address:text,idUser:integer```
```npx sequelize-cli model:generate --name product --attributes name:string,desc:text,price:integer,image:string,qty:integer,idUser:integer```
```npx sequelize-cli model:generate --name transaction --attributes idProduct:integer,idBuyer:integer,idSeller:integer,price:integer,status:string```
```npx sequelize-cli model:generate --name category --attributes name:string```
```npx sequelize-cli model:generate --name categoryProduct --attributes idProduct:integer,idCategory:integer```

//contoh penggunaan references
```javascript
idUser: {
    type: Sequelize.INTEGER,
    references: {
        model: "users",
        key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
}
```

//contoh penggunaan associate
```javascript
static associate(models) {
    profile.belongsTo(models.user, {
        as: "user",
        foreignKey: {
            name: "idUser",
        },
    });
}
```

```javascript
.belongsTo        //untuk anak ke orang tua
.hasOne           //untuk orang tua ke anak
.hasMany          //untuk orang tua punya banyak anak
.belongsToMany    //banyak ke banyak dan butuh tabel bantuan sebagai jembatan
```

//paket yang dipakai
```javascript
npm i bcrypt        //hashing password
npm i dotenv        //environment yang dipakai berkali-kali
npm i joi           //untuk validasi
npm i jsonwebtoken  //mendapatkan token
```