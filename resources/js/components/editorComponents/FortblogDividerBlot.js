import Quill from 'quill';

let BlockEmbed = Quill.import('blots/block/embed');

class FortblogDividerBlot extends BlockEmbed {
}

FortblogDividerBlot.blotName = 'divider';
FortblogDividerBlot.tagName = 'hr';

export default FortblogDividerBlot;
