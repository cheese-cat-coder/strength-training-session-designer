export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sheetId = searchParams.get('sheetId');

  if (!sheetId) {
    return Response.json({ error: 'Missing sheetId' }, { status: 400 });
  }

  try {
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
    const response = await fetch(csvUrl);

    if (!response.ok) {
      throw new Error(`Google Sheets returned ${response.status}`);
    }

    const csv = await response.text();
    return Response.json({ csv });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return Response.json(
      { error: `Failed to fetch sheet: ${message}` },
      { status: 500 }
    );
  }
}
