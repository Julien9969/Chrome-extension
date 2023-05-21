import CheckLine from "./interfaces/check-line";

enum checkCategoriesNumber {
    Audio_Transition = 1,
    Audio_Son_Parasite = 2,
    Vidéo_Transition = 3,
    Vidéo_Fondu_Noir = 4,
    Vidéo_Image_subliminale = 5,
    Sub_Timing = 6,
    Sub_Maquant = 7,
    Sub_Traduction = 8,
    Sub_Orthographe = 10,
    Sub_Italique = 11,
    Autre = 12,
}

const checkCategoriesString: CheckCategoriesString = {
    Audio_Transition: ["transition audio", "transi audio"],
    Audio_Son_Parasite: ["son parasite"],
    Vidéo_Transition: ["transition video", "transi video"],
    Vidéo_Fondu_Noir: ["fondu noir", "fondu"],
    Vidéo_Image_subliminale: ["image subliminale", "image subli"],
    Sub_Timing: ["sub timing", "timing", "timing sub"],
    Sub_Maquant: ["sub manquant", "manque sub"],
    Sub_Traduction: ["trad", "traduction", "sub traduction"],
    Sub_Orthographe: ["orthographe", "ortho", "sub orthographe"],
    Sub_Italique: ["italique", "ita", "sub italique", "italique sub"],
    Autre: ["autre"]
};

const accentMap = new Map([
    ['à', 'a'],
    ['â', 'a'],
    ['é', 'e'],
    ['è', 'e'],
    ['ê', 'e'],
    ['ù', 'u'],
  ]);

export default class InputChecker {

    static createCheckInput(input: string): CheckLine | null{
        const splitInput = input.trim().split(/ +/);

        if (splitInput.length >= 2) {
            const timecode = this.buildTiming(splitInput[0]);
            
            let idCategory: number | null;
            if (!Number.isNaN(parseInt(splitInput[1].trim()))) {
                idCategory = this.checkCategoryN(parseInt(splitInput[1].trim()));
            } else {
                idCategory = this.checkCategoryS(splitInput[1].trim());
                if (idCategory === null) {
                    try {
                        idCategory = this.checkCategoryS(splitInput[1].trim() + ' ' + splitInput[2].trim());
                        splitInput.splice(2, 1);
                    } catch {
                        idCategory = null;
                    }
                }
            }

            let comment: string = '';
            try {
                if (splitInput.length > 3) {
                    comment = splitInput.slice(2).join(' ');
                } else {
                    comment = splitInput[2];
                }
            } catch {}

            if (!comment) {
                comment = '';
            }

            console.log('timing : ' + timecode + ' category : ' + idCategory + ' description : ' + comment);
            if (timecode && idCategory) {
                return { timecode, idCategory, comment, timecodeNew: true };
            }
        }
        return null;
    }

    private static checkCategoryS(category: string): number | null {

        const lowercaseString = category.trim().toLowerCase();

        const convertedCategory = lowercaseString.replace(/[àâèéêù]/g, matched => accentMap.get(matched) || '');

        if (checkCategoriesString.Audio_Transition.includes(convertedCategory)) {
            return checkCategoriesNumber.Audio_Transition;
        } else if (checkCategoriesString.Audio_Son_Parasite.includes(convertedCategory)) {
            return checkCategoriesNumber.Audio_Son_Parasite;
        } else if (checkCategoriesString.Vidéo_Transition.includes(convertedCategory)) {
            return checkCategoriesNumber.Vidéo_Transition;
        } else if (checkCategoriesString.Vidéo_Fondu_Noir.includes(convertedCategory)) {
            return checkCategoriesNumber.Vidéo_Fondu_Noir;
        } else if (checkCategoriesString.Vidéo_Image_subliminale.includes(convertedCategory)) {
            return checkCategoriesNumber.Vidéo_Image_subliminale;
        } else if (checkCategoriesString.Sub_Timing.includes(convertedCategory)) {
            return checkCategoriesNumber.Sub_Timing;
        } else if (checkCategoriesString.Sub_Maquant.includes(convertedCategory)) {
            return checkCategoriesNumber.Sub_Maquant;
        } else if (checkCategoriesString.Sub_Traduction.includes(convertedCategory)) {
            return checkCategoriesNumber.Sub_Traduction;
        } else if (checkCategoriesString.Sub_Orthographe.includes(convertedCategory)) {
            return checkCategoriesNumber.Sub_Orthographe;
        } else if (checkCategoriesString.Sub_Italique.includes(convertedCategory)) {
            return checkCategoriesNumber.Sub_Italique;
        } else if (checkCategoriesString.Autre.includes(convertedCategory)) {
            return checkCategoriesNumber.Autre;
        } else {
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
        if (category >= 1 && category <= 12 && category !== 9) {
            return category;
        }
        return null;
    }
}

