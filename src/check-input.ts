import CheckLines from "./interfaces/check-line";

enum checkCategoriesNumber {
    Audio_Transition = 1,
    Audio_Son_Parasite = 2,
    Vidéo_Transition = 3,
    Vidéo_Fondu_Noir = 4,
    Vidéo_Image_subliminale = 5,
    Sub_Timing = 6,
    Sub_Maquant = 7,
    Sub_Traduction = 8,
    Sub_Orthographe = 9,
    Sub_Italique = 10,
    Autre = 11,
}

enum checkCategoriesString {
    Audio_Transition = "transition audio",
    Audio_Son_Parasite = "son parasite",
    Vidéo_Transition = "transition video",
    Vidéo_Fondu_Noir = "fondu noir",
    Vidéo_Image_subliminale = "image subliminale",
    Sub_Timing = "sub timing",
    Sub_Maquant = "sub maquant",
    Sub_Traduction = "trad",
    Sub_Orthographe = "orthographe",
    Sub_Italique = "italique",
    Autre = "autre",

}

const accentMap = new Map([
    ['à', 'a'],
    ['â', 'a'],
    ['é', 'e'],
    ['è', 'e'],
    ['ê', 'e'],
    ['ù', 'u'],
  ]);

export default class InputChecker {

    static createCheckInput(input: string): CheckLines | null{
        const splitInput = input.trim().split(/ +/);

        if (splitInput.length >= 2) {
            const timing = this.buildTiming(splitInput[0]);
            let category: number | null;
            if (!Number.isNaN(parseInt(splitInput[1].trim()))) {
                category = this.checkCategoryN(parseInt(splitInput[1].trim()));
            } else {
                category = this.checkCategoryS(splitInput[1].trim());
                if (category === null) {
                    category = this.checkCategoryS(splitInput[1].trim() + ' ' + splitInput[2].trim());
                    splitInput.splice(2, 1);
                }
            }

            let description: string | undefined;
            try {
                if (splitInput.length > 3) {
                    description = splitInput.slice(2).join(' ');
                } else {
                    description = splitInput[2];
                }
            } catch {
                description = '';
            }
            console.log('timing : ' + timing + ' category : ' + category + ' description : ' + description);
            if (timing && category) {
                return { timing, category, description };
            }
        }
        return null;
    }

    private static checkCategoryS(category: string): number | null {

        const lowercaseString = category.trim().toLowerCase();

        const convertedCategory = lowercaseString.replace(/[àâèéêù]/g, matched => accentMap.get(matched) || '');

        switch (convertedCategory) {
            case checkCategoriesString.Audio_Transition:
                return checkCategoriesNumber.Audio_Transition;
            case checkCategoriesString.Audio_Son_Parasite:
                return checkCategoriesNumber.Audio_Son_Parasite;
            case checkCategoriesString.Vidéo_Transition:
                return checkCategoriesNumber.Vidéo_Transition;
            case checkCategoriesString.Vidéo_Fondu_Noir:
                return checkCategoriesNumber.Vidéo_Fondu_Noir;
            case checkCategoriesString.Vidéo_Image_subliminale:
                return checkCategoriesNumber.Vidéo_Image_subliminale;
            case checkCategoriesString.Sub_Timing:
                return checkCategoriesNumber.Sub_Timing;
            case checkCategoriesString.Sub_Maquant:
                return checkCategoriesNumber.Sub_Maquant;
            case checkCategoriesString.Sub_Traduction:
                return checkCategoriesNumber.Sub_Traduction;
            case checkCategoriesString.Sub_Orthographe:
                return checkCategoriesNumber.Sub_Orthographe;
            case checkCategoriesString.Sub_Italique:
                return checkCategoriesNumber.Sub_Italique;
            case checkCategoriesString.Autre:
                return checkCategoriesNumber.Autre;
            default:
                return null;
        }
    }

    private static buildTiming(timing: string): string | null {

        const checkTimingCallback = (num: string): string | null => {
            if (!Number.isNaN(parseInt(num)) && parseInt(num) < 60) {
                const number = parseInt(num)
                return number < 10 ? '0' + number : number.toString() ;
            } else {
                return null;
            }
        };

        let splitTiming = timing.split(':').map((num) => checkTimingCallback(num));
        if (splitTiming.length < 2) {
            splitTiming = timing.split('.').map((num) => checkTimingCallback(num));
        }

        let isTimingValid = true;
        splitTiming.forEach((num) => {
            if (num === null) {
                isTimingValid = false;
            }   
        });

        if (!isTimingValid) {
            return null;
        }

        if (splitTiming.length === 1) {
            return '00:00:' + splitTiming[0];
        }
        else if (splitTiming.length === 2) {
            return '00:' + splitTiming[0] + ':' + splitTiming[1];
        } else if (splitTiming.length === 3) {
            return splitTiming[0] + ':' + splitTiming[1] + ':' + splitTiming[2];
        }
        return null;    
    }

    private static checkCategoryN(category: number): number | null {
        if (category >= 1 && category <= 11) {
            return category;
        }
        return null;
    }
}

