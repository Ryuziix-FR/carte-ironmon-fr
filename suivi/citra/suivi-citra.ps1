# Carte IronMON FR : relie ta partie Citra à la carte en ligne (https://ryuziix-fr.github.io/carte-ironmon-fr/)
#
# 1. Lance ton jeu dans Citra et charge ta partie.
# 2. Double-clique « suivi-citra.bat » (à côté de ce fichier) et laisse la fenêtre ouverte.
# 3. Sur la carte (Chrome ou Edge), clique « Relier mon jeu » et choisis « carte-ironmon-position.json »,
#    qui apparaît à côté de ce fichier.
#
# Le programme ne fait que LIRE la mémoire du jeu (serveur RPC de Citra, port 45987) : il ne modifie rien.
# Jeux : Pokémon Ultra-Soleil et Pokémon Soleil (versions européennes), reconnus tout seuls.

$ErrorActionPreference = "Stop"
$sortie = Join-Path $PSScriptRoot "carte-ironmon-position.json"

# Noms des zones de Soleil et d'Ultra-Soleil (numéro de zone -> lieu)
$ZONES_SOLEIL = @('Route 1','Route 1','Route 3','Route 2','Baie de Kala''e','Mer de Mele-Mele','Mer de Mele-Mele','Ekaeka','Ekaeka','Ekaeka','Lili''i','Lili''i','Lili''i','Sentier de Mahalo','Sentier de Mahalo','Ruines du Conflit','Ruines du Conflit','Ruines du Conflit','Colline Dicarat','Colline Dicarat','Cimetière d''Ekaeka','Jardin de Mele-Mele','Grotte Verlamer','Champ de Baies','Grotte Verdoyante','Grotte Verdoyante','Route 1','Route 1','Route 1','Route 1','Lili''i','Lili''i','Lili''i','Lili''i','Lili''i','Lili''i','Lili''i','Route 1','Route 1','Ekaeka','Route 2','Route 2','Ekaeka','Ekaeka','Ekaeka','Champ de Baies','Route 1','Route 1','Route 1','Route 1','Route 1','Route 1','Route 1','Route 1','Ekaeka','Ekaeka','Ekaeka','Ekaeka','Ekaeka','Ekaeka','Ekaeka','Ekaeka','Route 2','Route 2','Ekaeka','Route 1','Ekaeka','Route 2','Route 4','Route 5','Route 6','Route 7','Route 8','Route 9','Club Hano-Hano','Plage Hano-Hano','Ohana','Ho''ohale','Konikoni','Rue du Dôme Royal','Ruines de l''Éveil','Ruines de l''Éveil','Ruines de l''Éveil','Colline Memento','Côte Reculée d''Akala','Tunnel Taupiqueur','Parc Volcanique','Parc Volcanique','Colline Clapotis','Colline Clapotis','Colline Clapotis','Jungle Sombrefeuille','Jungle Sombrefeuille','Jungle Sombrefeuille','Jungle Sombrefeuille','Jungle Sombrefeuille','Ohana','Ohana','Ohana','Ohana','Konikoni','Konikoni','Konikoni','Konikoni','Konikoni','Konikoni','Konikoni','Konikoni','Konikoni','Ho''ohale','Ho''ohale','Ho''ohale','Ho''ohale','Ho''ohale','Ho''ohale','Ho''ohale','Ho''ohale','Ho''ohale','Ho''ohale','Route 8','Club Hano-Hano','Rue du Dôme Royal','Route 8','Route 8','Rue du Dôme Royal','Konikoni','Konikoni','Route 9','Dôme Royal','Route 8','Ranch Ohana','Ranch Ohana','Ranch Ohana','Ho''ohale','Ho''ohale','Rue du Dôme Royal','Route 8','Konikoni','Ohana','Route 5','Route 10','Route 11','Côte Sauvage','Route 13','Village Toko','Route 14','Route 15','Route 16','Route 17','Route 12','Malié','Malié','Kokohio','Désert Haina','Désert Haina','Désert Haina','Désert Haina','Désert Haina','Désert Haina','Désert Haina','Désert Haina','Jardin d''Ula-Ula','Parc de Malié','Mont Hokulani','Mont Ardent','Ruines de l''Essor','Ruines de l''Essor','Ruines de l''Essor','Lac du Halo Solaire','Lac du Halo Solaire','Lac du Halo Solaire','Lac du Halo Solaire','Lac du Halo Lunaire','Lac du Halo Lunaire','Lac du Halo Lunaire','Lac du Halo Lunaire','Mont Lanakila','Mont Lanakila','Mont Lanakila','Mont Lanakila','Mont Lanakila','Manoir Chelou','Manoir Chelou','Manoir Chelou','Manoir Chelou','Manoir Chelou','Manoir Chelou','Manoir Chelou','Manoir Chelou','Manoir Chelou','Manoir Chelou','Manoir Chelou','Bradley Prix','Bradley Prix','Bradley Prix','Malié','Malié','Malié','Malié','Malié','Malié','Malié','Malié','Malié','Malié','Malié','Route 15','Route 15','Route 15','Route 13','Route 13','Route 17','Route 16','Observatoire','Observatoire','Observatoire','Mont Ardent','Route 13','Route 13','Ligue Pokémon','Ligue Pokémon','Ligue Pokémon','Ligue Pokémon','Ligue Pokémon','Ligue Pokémon','Malié','Village Toko','Kokohio','Route 16','Mont Lanakila','Mont Hokulani','Prairie de Poni','Vieille Route','Récif de Poni','Forêt de Poni','Plaine de Poni','Côte de Poni','Chemin du Défi','Village Flottant','Jardin de Poni','Grand Canyon de Poni','Grand Canyon de Poni','Grand Canyon de Poni','Grand Canyon de Poni','Grand Canyon de Poni','Grand Canyon de Poni','Autel du Soleil','Autel du Soleil','Autel de la Lune','Autel de la Lune','Ruines de l''Au-Delà','Ruines de l''Au-Delà','Ruines de l''Au-Delà','Caverne Coda','Caverne Coda','Île Noadkoko','Village Flottant','Village Flottant','Village Flottant','Village Flottant','Village Flottant','Vieille Route','Vieille Route','Village Flottant','Arbre de Combat','Arbre de Combat','Arbre de Combat','Arbre de Combat','Paradis Æther','Paradis Æther','Paradis Æther','Paradis Æther','Paradis Æther','Paradis Æther','Paradis Æther','Paradis Æther','Paradis Æther','Paradis Æther','Paradis Æther','Paradis Æther','Paradis Æther','Route 1','Route 1','Ultra-Dimension','Route 1','Route 1','Route 1','Route 1','Route 1','Route 1','Route 1','Route 1','Route 1','Route 1','Route 1')
$ZONES_ULTRASOLEIL = @('Route 1','Route 1','Route 1','Route 1','Route 1','Route 1','Route 3','Route 2','Baie de Kala''e','Mer de Mele-Mele','Mer de Mele-Mele','Plage Big Wave','Ekaeka','Ekaeka','Ekaeka','Ekaeka','Lili''i','Lili''i','Lili''i','Sentier de Mahalo','Sentier de Mahalo','Sentier de Mahalo','Ruines du Conflit','Ruines du Conflit','Ruines du Conflit','Ruines du Conflit','Colline Dicarat','Colline Dicarat','Cimetière d''Ekaeka','Jardin de Mele-Mele','Grotte Verlamer','Champ de Baies','Grotte de la Plage','Grotte Verdoyante','Grotte Verdoyante','Route 1','Route 1','Route 1','Route 1','Lili''i','Lili''i','Lili''i','Lili''i','Lili''i','Lili''i','Lili''i','Route 1','Route 1','Ekaeka','Route 2','Route 2','Ekaeka','Ekaeka','Ekaeka','Champ de Baies','Route 1','Route 1','Route 1','Route 1','Route 1','Route 1','Route 1','Route 1','Ekaeka','Ekaeka','Ekaeka','Ekaeka','Ekaeka','Ekaeka','Ekaeka','Ekaeka','Ekaeka','Route 2','Route 2','Ekaeka','Ekaeka','Ekaeka','Route 1','Ekaeka','Route 2','Route 4','Route 5','Route 6','Route 7','Route 8','Route 9','Club Hano-Hano','Plage Hano-Hano','Plage d''Ho''ohale','Ohana','Ho''ohale','Konikoni','Rue du Dôme Royal','Tunnel Perce-Mont','Ruines de l''Éveil','Ruines de l''Éveil','Ruines de l''Éveil','Colline Memento','Côte Reculée d''Akala','Tunnel Taupiqueur','Parc Volcanique','Parc Volcanique','Colline Clapotis','Colline Clapotis','Colline Clapotis','Jungle Sombrefeuille','Jungle Sombrefeuille','Jungle Sombrefeuille','Jungle Sombrefeuille','Jungle Sombrefeuille','Ohana','Ohana','Ohana','Ohana','Konikoni','Konikoni','Konikoni','Konikoni','Konikoni','Konikoni','Konikoni','Konikoni','Konikoni','Ho''ohale','Ho''ohale','Ho''ohale','Ho''ohale','Ho''ohale','Ho''ohale','Ho''ohale','Ho''ohale','Ho''ohale','Ho''ohale','Ho''ohale','Ho''ohale','Ho''ohale','Ho''ohale','Ho''ohale','Route 8','Club Hano-Hano','Rue du Dôme Royal','Route 8','Route 8','Rue du Dôme Royal','Konikoni','Konikoni','Route 9','Dôme Royal','Route 8','Ranch Ohana','Ranch Ohana','Ranch Ohana','Ho''ohale','Konikoni','Konikoni','Rue du Dôme Royal','Ho''ohale','Plaine des Pikachu','Ho''ohale','Rue du Dôme Royal','Route 8','Konikoni','Ohana','Route 5','Route 10','Route 11','Plage d''Ula-Ula','Route 13','Village Toko','Route 14','Route 15','Route 16','Route 17','Route 12','Malié','Malié','Kokohio','Désert Haina','Désert Haina','Désert Haina','Désert Haina','Désert Haina','Désert Haina','Désert Haina','Désert Haina','Jardin d''Ula-Ula','Parc de Malié','Mont Hokulani','Mont Ardent','Ruines de l''Essor','Ruines de l''Essor','Ruines de l''Essor','Lac du Halo Solaire','Lac du Halo Solaire','Lac du Halo Solaire','Lac du Halo Solaire','Lac du Halo Lunaire','Lac du Halo Lunaire','Lac du Halo Lunaire','Lac du Halo Lunaire','Mont Lanakila','Mont Lanakila','Mont Lanakila','Mont Lanakila','Mont Lanakila','Mont Lanakila','Mont Lanakila','Mont Lanakila','Manoir Chelou','Manoir Chelou','Manoir Chelou','Manoir Chelou','Manoir Chelou','Manoir Chelou','Manoir Chelou','Manoir Chelou','Manoir Chelou','Manoir Chelou','Manoir Chelou','Manoir Chelou','Bradley Prix','Bradley Prix','Bradley Prix','Malié','Malié','Malié','Malié','Malié','Malié','Malié','Malié','Malié','Malié','Malié','Route 15','Route 15','Route 15','Route 13','Route 13','Route 17','Route 16','Route 16','Observatoire','Observatoire','Observatoire','Observatoire','Mont Ardent','Malié','Route 15','Route 13','Route 13','Ligue Pokémon','Ligue Pokémon','Ligue Pokémon','Ligue Pokémon','Ligue Pokémon','Ligue Pokémon','Ligue Pokémon','Malié','Village Toko','Kokohio','Route 16','Mont Lanakila','Mont Hokulani','Prairie de Poni','Vieille Route','Récif de Poni','Forêt de Poni','Plaine de Poni','Côte de Poni','Chemin du Défi','Plage de Poni','Village Flottant','Jardin de Poni','Grand Canyon de Poni','Grand Canyon de Poni','Grand Canyon de Poni','Grand Canyon de Poni','Grand Canyon de Poni','Grand Canyon de Poni','Autel du Soleil','Autel du Soleil','Autel de la Lune','Autel de la Lune','Ruines de l''Au-Delà','Ruines de l''Au-Delà','Ruines de l''Au-Delà','Caverne Coda','Caverne Coda','Caverne Coda','Île Noadkoko','Grotte de la Plaine','Village Flottant','Village Flottant','Village Flottant','Village Flottant','Village Flottant','Vieille Route','Vieille Route','Village Flottant','Arbre de Combat','Arbre de Combat','Arbre de Combat','Arbre de Combat','Paradis Æther','Paradis Æther','Paradis Æther','Paradis Æther','Paradis Æther','Paradis Æther','Paradis Æther','Paradis Æther','Paradis Æther','Paradis Æther','Paradis Æther','Paradis Æther','Paradis Æther','Paradis Æther','Route 1','Route 1','Route 1','Ultra-Abysses','Ultra-Mégalopole','Ultra-Mégalopole','Tour Mégalopole','Tour Mégalopole','Ultra-Centrale','Ultra-Vallée','Ultra-Désert','Ultra-Forêt','Ultra-Jungle','Ultra-Gratte-Ciel','Ultra-Gratte-Ciel','Ultra-Dimension Zéro','Ultra-Dimension Zéro','Ultra-Dimension Zéro','Ultra-Dimension Zéro','Paradis Æther','Château Rocket','Château Rocket','Château Rocket','Château Rocket','Château Rocket','Château Rocket','Château Rocket','Château Rocket','Château Rocket','Château Rocket','Château Rocket','Château Rocket','Château Rocket','Château Rocket','Château Rocket','Château Rocket','Château Rocket','Château Rocket','Château Rocket','Château Rocket','Château Rocket','Château Rocket','Château Rocket','Château Rocket','Château Rocket','Château Rocket','Château Rocket','Château Rocket','Château Rocket','Château Rocket','Château Rocket','Château Rocket','Château Rocket','Château Rocket','Château Rocket','Château Rocket','Château Rocket','Château Rocket','Château Rocket','Château Rocket','Château Rocket','Château Rocket')

$udp = New-Object System.Net.Sockets.UdpClient
$udp.Client.ReceiveTimeout = 1000
$udp.Connect("127.0.0.1", 45987)
$hasard = New-Object System.Random

# Lit jusqu'à 32 octets à une adresse du jeu (format de requête RPC de Citra) ; $null si Citra ne répond pas
function Lire([uint32]$adresse, [int]$taille) {
	$id = [uint32]$hasard.Next()
	$req = New-Object byte[] 24
	[BitConverter]::GetBytes([uint32]1).CopyTo($req, 0)
	[BitConverter]::GetBytes($id).CopyTo($req, 4)
	[BitConverter]::GetBytes([uint32]1).CopyTo($req, 8)
	[BitConverter]::GetBytes([uint32]8).CopyTo($req, 12)
	[BitConverter]::GetBytes($adresse).CopyTo($req, 16)
	[BitConverter]::GetBytes([uint32]$taille).CopyTo($req, 20)
	try {
		[void]$udp.Send($req, $req.Length)
		$fin = New-Object System.Net.IPEndPoint([System.Net.IPAddress]::Any, 0)
		$rep = $udp.Receive([ref]$fin)
	} catch { return $null }
	if ($rep.Length -lt 16 + $taille -or [BitConverter]::ToUInt32($rep, 4) -ne $id) { return $null }
	return $rep[16..(15 + $taille)]
}
function U32([uint32]$a) { $b = Lire $a 4; if ($b) { [BitConverter]::ToUInt32([byte[]]$b, 0) } else { $null } }

# Signature du code (reconnaît le jeu), puis [pointeur du jeu] -> objet du jeu, +0x24 -> gestionnaire de terrain,
# +0x60 -> position courante (u16 monde, u16 zone, 3 flottants x y z). Mêmes décalages dans les deux jeux.
$JEUX = @(
	@{ nom = "Pokemon Ultra-Soleil"; ultra = $true; sig = 0x401B98; octets = "70-80-BD-E8-84-39-6A-00"; jeu = 0x6A3984 },
	@{ nom = "Pokemon Soleil"; ultra = $false; sig = 0x388D8C; octets = "F0-47-2D-E9-00-40-A0-E1"; jeu = 0x67206C })
$script:jeuTrouve = $null
function LireSoleil {
	$j = $script:jeuTrouve
	if ($j) {
		$sig = Lire $j.sig 8
		if (-not $sig -or ([BitConverter]::ToString([byte[]]$sig) -ne $j.octets)) { $j = $null }
	}
	if (-not $j) {
		foreach ($x in $JEUX) {
			$sig = Lire $x.sig 8
			if ($sig -and ([BitConverter]::ToString([byte[]]$sig) -eq $x.octets)) { $j = $x; break }
		}
	}
	$script:jeuTrouve = $j
	if (-not $j) { return $null }
	$zones = if ($j.ultra) { $ZONES_ULTRASOLEIL } else { $ZONES_SOLEIL }
	$jeu = U32 $j.jeu
	if (-not $jeu -or $jeu -lt 0x30000000 -or $jeu -ge 0x38000000) { return $null }
	$terrain = U32 ($jeu + 0x24)
	if (-not $terrain -or $terrain -lt 0x30000000 -or $terrain -ge 0x38000000) { return $null }
	$p = Lire ($terrain + 0x60) 16
	if (-not $p) { return $null }
	$p = [byte[]]$p
	$zone = [BitConverter]::ToUInt16($p, 2)
	if ($zone -ge $zones.Count) { return $null }
	return @{ nom = $j.nom; monde = [BitConverter]::ToUInt16($p, 0); zone = $zone; lieu = $zones[$zone]
		x = [math]::Round([BitConverter]::ToSingle($p, 4)); y = [math]::Round([BitConverter]::ToSingle($p, 8))
		z = [math]::Round([BitConverter]::ToSingle($p, 12)) }
}

function Json([string]$s) { '"' + ($s -replace '\\', '\\' -replace '"', '\"') + '"' }

Write-Host "Carte IronMON FR : suivi Citra lancé. Laisse cette fenêtre ouverte pendant ta partie."
Write-Host "Fichier à choisir sur la carte : $sortie"
$dernier = ""
$attente = $false
while ($true) {
	$e = LireSoleil
	if ($e) {
		$cle = "$($e.zone)|$($e.x)|$($e.z)"
		if ($cle -ne $dernier) {
			$dernier = $cle
			$json = '{"jeu":{"nom":' + (Json $e.nom) + '},"lieu":' + (Json $e.lieu) + ',"monde":' + $e.monde + ',"zone":' + $e.zone +
				',"x":' + $e.x + ',"y":' + $e.y + ',"z":' + $e.z + ',"heure":' + [DateTimeOffset]::Now.ToUnixTimeSeconds() + '}'
			[IO.File]::WriteAllText($sortie, $json, (New-Object System.Text.UTF8Encoding($false)))
			if ($attente) { Write-Host "Jeu trouvé." }
			$attente = $false
			Write-Host ("{0:HH:mm:ss}  {1}" -f (Get-Date), $e.lieu)
		}
	} elseif (-not $attente) {
		$attente = $true
		Write-Host "En attente du jeu : lance Citra, ta partie, et vérifie que le jeu est pris en charge…"
	}
	Start-Sleep -Milliseconds 1000
}
