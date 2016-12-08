export class DoneValueConverter {

    toView(value) {
        if (value === undefined) {
            return;
        }

        if (value) {
            return '<span class="glypicon glyphicon-check"></span>';
        } else {
            return '<span class="glyphicon glyphicon-unchecked"></span>';
        }
    }
}