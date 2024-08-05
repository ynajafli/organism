// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate() {
      const randomIndex = Math.floor(Math.random() * 15);
      let newBase = returnRandBase();
      while (this.dna[randomIndex] === newBase) {
        newBase = returnRandBase();
      }
      this.dna[randomIndex] = newBase;
      return this.dna;
    },
    compareDNA(obj) {
      let counter = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === obj.dna[i]) {
          counter++;
        }
      }
      console.log(Math.floor((counter/15) * 100) + '%');
    },
    willLikelySurvive() {
      let counter = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === 'C' || this.dna[i] === 'G') {
          counter++;
        }
      }
      return (counter/15) >= 0.60;
    }
  }
}

let strong = [];

while (strong.length < 30) {
  let counter = 1;
  let test = pAequorFactory(counter, mockUpStrand());
  if (test.willLikelySurvive()) {
    strong.push(test);
    counter++;
  }
}