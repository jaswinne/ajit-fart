const replacements =[
	{
    regex: /\bAjit Pai\b/,
    replacement: 'A Giant Human Fart'
  },
	{
		regex: /\bfarts?\b/i,
		replacement: 'Ajit Pai'
	}
]


walk(document.body);

function walk(node)
{
	// I stole this function from here:
	// http://is.gd/mwZp7E

	var child, next;

	if (node && (node.tagName && (node.tagName.toLowerCase() == 'input' || node.tagName.toLowerCase() == 'textarea')
	    || (Array.isArray(node.classList) && node.classList.indexOf('ace_editor') > -1))) {
		return;
	}

	switch ( node.nodeType )
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child )
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}

function handleText(textNode)
{
	var v = textNode.nodeValue;
	var has = false;
	replacements.forEach(function(el){
		if(!has){
			var vOrig = v;
			v = v.replace(el.regex, el.replacement);
			if(v !== vOrig){
				has = true;
			}
		}
	})

	textNode.nodeValue = v;
}
