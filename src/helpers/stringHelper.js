export const decodeHtml = (str) =>
{
    let result = '';
    var map =
    {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#039;': "'"
    };

    if (str) result = str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function(m) {return map[m];});

    return result;
}

export const stripTags = (str) => {
   return str.replace(/<[^>]+>/g, '');
}

export function numWord(value, words){  
	value = Math.abs(value) % 100; 
	var num = value % 10;
	if(value > 10 && value < 20) return words[2]; 
	if(num > 1 && num < 5) return words[1];
	if(num === 1) return words[0]; 
	return words[2];
}

export function stripTagsAllow(str, allow) {
    // making sure the allow arg is a string containing only tags in lowercase (<a><b><c>)
    allow = (((allow || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
  
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
    var commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return str.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
      return allow.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
}

export const numberRuFormat = (number) =>{
   return new Intl.NumberFormat('ru-RU').format(number);
} 