function Test(prenom, nom) {
    this.nom = nom;
    this.prenom = prenom;
}

Test.prototype = {
    sayMyName: function () {
        console.log(`${this.prenom} ${this.nom}`);
    }
}

const a = new Test('oui', 'non');
a.sayMyName();