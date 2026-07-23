// Commits the generated JSON directly to your GitHub repo
export async function commitRecipeToGitHub(
  recipe: any, 
  token: string, 
  repo: string
) {
  const path = `recipes/${recipe.id}/recipe.json`;
  const content = btoa(unescape(encodeURIComponent(JSON.stringify(recipe, null, 2))));
  
  const response = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `Add recipe: ${recipe.basicInfo.name}`,
      content: content,
    })
  });

  if (!response.ok) {
    throw new Error('Failed to commit to GitHub');
  }
  
  return await response.json();
}
