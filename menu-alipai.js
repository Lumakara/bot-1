// © ALIP-AI | WhatsApp: 0812-4970-3469
// ⚠️ Do not remove this credit

require('./settings');
require('./alipai-cmd');
const fs = require('fs');
const chalk = require('chalk');

global.allmenu = `
╭─⧉ 「STICKERS MENU 」──
│✎ .brat
│✎ .bratvid
│✎ .bratanime
│✎ .bratgambar
│✎ .bratgambarhd
│✎ .bratimg3
│✎ .bratpink
│✎ .bratvid
│✎ .ytcomment
│✎ .emoji
│✎ .emojigif
│✎ .emojimix
│✎ .manusialidi
│✎ .qc
│✎ .smeme
│✎ .sticker
│✎ .stikeranime
│✎ .stikerdinokuning
│✎ .stikergojo
│✎ .stikermukalu
│✎ .stikerpentol
│✎ .stikerrandom
│✎ .stikerspongebob
│✎ .swm 🅟
│✎ .toimg
│✎ .tvstiker
╰─────────────────

╭─⧉ 「TOOLS MENU 」──
│✎ .saveweb
│✎ .ttsbrando
│✎ .ptvch
│✎ .voicecover 🅟
│✎ .vocalremover
│✎ .tempo
│✎ .speech2text 
│✎ .sidompul
│✎ .togif
│✎ .tovn
│✎ .hdvid 🅟
│✎ .tomp3
│✎ .ai
│✎ .aitts
│✎ .ambilsw
│✎ .donate
│✎ .enc 🅟
│✎ .enchard 🅟
│✎ .fakecall
│✎ .getpp
│✎ .gptonline
│✎ .gptimg
│✎ .hd
│✎ .iqc
│✎ .kapanreset
│✎ .ngl
│✎ .nulis
│✎ .ocr 🅟
│✎ .rch
│✎ .rvo 🅟
│✎ .shortlink
│✎ .shortlink2
│✎ .ssweb
│✎ .struk
│✎ .texttosound
│✎ .tourl
│✎ .tourl2 🅟
│✎ .tourl3
│✎ .translate
│✎ .ytsummarizer
╰─────────────────

╭─⧉ 「MAKER MENU 」──
│✎ .animediff 🅟
│✎ .photoai
│✎ .fakektp
│✎ .carbon
│✎ .tofigure 
│✎ .telanjang 🅟
│✎ .fakestory
│✎ .tosunda 🅟
│✎ .tojawa 
│✎ .hijabpin 
│✎ .hitamin
│✎ .todonghua 🅟
│✎ .tomanhwa 🅟
│✎ .toanime 🅟
│✎ .tomanga 🅟
│✎ .topenjara 
│✎ .alipedit 🅟
│✎ .putihkan 🅟
│✎ .aiedit 🅟
│✎ .banana 🅟
│✎ .sdm 🅟
│✎ .tomoai
│✎ .topacar
│✎ .tomonyet
│✎ .tosatan
│✎ .toroblox
│✎ .topunk
│✎ .tomangu
│✎ .tosad
│✎ .todpr
│✎ .tobabi
│✎ .buatgambar
│✎ .buatlagu 🅟
│✎ .buatvideo 🅟
│✎ .ghibli 🅟
│✎ .tobotak 🅟
│✎ .tochibi 🅟
│✎ .todino 🅟
│✎ .jadidisney
│✎ .jadigta
│✎ .jadipixar
│✎ .nglspam 🅟
│✎ .polaroid 🅟
│✎ .tofootball 🅟
│✎ .tokartun 🅟
│✎ .veo3 🅟
│✎ .zrooart
│✎ .tospiderman
│✎ .tonaruto
│✎ .tobatman
│✎ .tosuperman
│✎ .toironman
│✎ .tocaptainamerica
│✎ .tothor
│✎ .tohulk
│✎ .towolverine
│✎ .todeadpool
│✎ .toflash
│✎ .toaquaman
│✎ .tocyan
│✎ .tovision
│✎ .toblackpanther
│✎ .tostarlord
│✎ .togroot
│✎ .torocket
│✎ .todracula
│✎ .tofrankenstein
│✎ .towerewolf
│✎ .tozombie
│✎ .tovampire
│✎ .toghost
│✎ .toskeleton
│✎ .todevil
│✎ .toangel
│✎ .tofairy
│✎ .towizard
│✎ .towinged
│✎ .toelf
│✎ .todwarf
│✎ .toorc
│✎ .totroll
│✎ .togiant
│✎ .tominotaur
│✎ .tomedusa
│✎ .tocentaur
│✎ .togriffin
│✎ .tophoenix
│✎ .todragon
│✎ .tounicorn
│✎ .topeacock
│✎ .towolf
│✎ .tofox
│✎ .tobear
│✎ .tolion
│✎ .totiger
│✎ .topanda
│✎ .tokoala
│✎ .topenguin
│✎ .toowl
│✎ .toeagle
│✎ .tofalcon
│✎ .toraven
│✎ .tocrow
│✎ .tosnake
│✎ .toshark
│✎ .tocrocodile
│✎ .tooctopus
│✎ .tojellyfish
│✎ .tostarfish
│✎ .toseahorse
│✎ .todolphin
│✎ .towhale
│✎ .torobot
│✎ .tocyborg
│✎ .toandroid
│✎ .toalien
│✎ .toufo
│✎ .toastronaut
│✎ .tocosmonaut
│✎ .toscuba
│✎ .todiver
│✎ .topirate
│✎ .tocowboy
│✎ .toninja
│✎ .tosamurai
│✎ .toviking
│✎ .toknight
│✎ .toarcher
│✎ .tomage
│✎ .tocleric
│✎ .tobard
│✎ .torogue
│✎ .tomonk
│✎ .tobarbarian
│✎ .tonecromancer
│✎ .todruid
│✎ .toranger
│✎ .topaladin
│✎ .togunslinger
│✎ .tomechanic
│✎ .toscientist
│✎ .todoctor
│✎ .toengineer
│✎ .toartist
│✎ .tosinger
│✎ .todancer
│✎ .toactor
│✎ .todirector
│✎ .towriter
│✎ .tophotographer
│✎ .tochef
│✎ .tobaker
│✎ .tobarista
│✎ .tobartender
│✎ .topilot
│✎ .todriver
│✎ .tosailor
│✎ .tosoldier
│✎ .topoliceman
│✎ .tofirefighter
│✎ .toteacher
│✎ .toprofessor
│✎ .tostudent
│✎ .toprogrammer
│✎ .todesigner
│✎ .totester
│✎ .tomanager
│✎ .toboss
│✎ .toceo
│✎ .tocfo
│✎ .tocoo
│✎ .tocmo
│✎ .tocto
│✎ .tocpo
│✎ .tocko
│✎ .toclown
│✎ .tomime
│✎ .tojester
│✎ .tomagician
│✎ .toillusionist
│✎ .toescapeartist
│✎ .toacrobat
│✎ .tocontortionist
│✎ .toswordswallower
│✎ .tofirebreather
│✎ .tojugger
│✎ .tounicyclist
│✎ .totightrope
│✎ .totrapeze
│✎ .toaerialist
│✎ .tocannon
│✎ .tostilts
│✎ .tomask
│✎ .tomummy
│✎ .tozorro
│✎ .tosherlock
│✎ .tophantom
│✎ .todraco
│✎ .tohannibal
│✎ .tojoker
│✎ .tovenom
│✎ .tocarnage
│✎ .togreen
│✎ .tolizard
│✎ .torhino
│✎ .tovulture
│✎ .toelectro
│✎ .tosandman
│✎ .tomysterio
│✎ .togoblin
│✎ .tochemo
│✎ .toloki
│✎ .tothanos
│✎ .togalactus
│✎ .todarkseid
│✎ .tobrainiac
│✎ .todoomsday
│✎ .tobizarro
│✎ .tometallo
│✎ .toparasite
│✎ .togrodd
│✎ .tocircus
│✎ .toreverse
│✎ .tomirror
│✎ .togold
│✎ .tosilver
│✎ .tobronze
│✎ .tocopper
│✎ .tosteel
│✎ .tocarbon
│✎ .tocrystal
│✎ .todiamond
│✎ .tosapphire
│✎ .toruby
│✎ .toemerald
│✎ .totopaz
│✎ .toamethyst
│✎ .toopal
│✎ .toperidot
│✎ .toaquamarine
│✎ .tocitrine
│✎ .totourmaline
│✎ .togarnet
│✎ .tospinel
│✎ .tozircon
│✎ .totanzanite
│✎ .toiolite
│✎ .tohematite
│✎ .tomoonstone
│✎ .tosunstone
│✎ .tostarstone
│✎ .tocomet
│✎ .tometeor
│✎ .toasteroid
│✎ .tonebula
│✎ .togalaxy
│✎ .touniverse
│✎ .toblackhole
│✎ .towormhole
│✎ .toportal
│✎ .totime
│✎ .tospace
│✎ .todimension
│✎ .toparallel
│✎ .toalternate
│✎ .tomultiverse
│✎ .tomegaverse
│✎ .tometaverse
│✎ .toomniverse
╰─────────────────

╭─⧉ 「PRIMBON MENU 」──
│✎ .artinama
│✎ .cekaura
│✎ .ceksial
│✎ .darkjoke
│✎ .isidompet
│✎ .jodohmakanan
│✎ .kecocokannama
│✎ .nasibbatere
│✎ .nomerhoki
│✎ .pantun
│✎ .profesiku
│✎ .quotes
│✎ .ramalancinta
│✎ .ramalanjodoh
│✎ .ramalanjodohbali
│✎ .ramalannasib
│✎ .scankontol
│✎ .scanmemek
│✎ .suamiistri
│✎ .zodiak
╰─────────────────

╭─⧉ 「FUN MENU 」──
│✎ .artinama
│✎ .cekbeban
│✎ .cekbucin
│✎ .cekfemboy
│✎ .cekgay
│✎ .cekjodoh
│✎ .cekjones
│✎ .cekkaya
│✎ .cekkodam
│✎ .cekkontol
│✎ .cekmasadepan
│✎ .cekmemek
│✎ .ceksange
│✎ .cekstress
│✎ .cekwibu
│✎ .fakeml
│✎ .faktadunia
│✎ .faktaunik
│✎ .infonegara
│✎ .jumlahuser
│✎ .kecocokanpasangan
│✎ .kirimch
│✎ .meme
│✎ .pakustad
│✎ .planet
│✎ .quotesanime
│✎ .sertifikattolol
│✎ .tafsirmimpi
│✎ .waifu
╰─────────────────

╭─⧉ 「DOWNLOAD MENU 」──
│✎ .tiktok
│✎ .tiktokmp3
│✎ .twitter
│✎ .ytmp3
│✎ .ytmp4
│✎ .pinterest
│✎ .pindl
│✎ .alipdl support all link
│✎ .capcut
│✎ .facebook
│✎ .gitclone
│✎ .gdrive
│✎ .instagram
│✎ .mediafire
│✎ .pastebin
│✎ .play1
│✎ .spdown
│✎ .telesticker
│✎ .douyin / .dy
│✎ .likee / .lk
│✎ .snackvideo / .sv
│✎ .threads / .thds
│✎ .videy / .vd
╰─────────────────

╭─⧉ 「AI MENU 」──
│✎ .aimention
│✎ .publicai
│✎ .powerbrain
│✎ .venice
│✎ .webpilot
│✎ .logicbell
│✎ .bard
│✎ .hyperai
│✎ .autoai
│✎ .ai
│✎ .airealtime
│✎ .gpt5plus 🅟
│✎ .soraai 🅟
│✎ .openai 
│✎ .groq
│✎ .customai 
╰─────────────────

╭─⧉ 「SEARCH MENU 」──
│✎ .toproblox
│✎ .gsmarena
│✎ .wattpad
│✎ .searchgame
│✎ .soundcloud
│✎ .npmjs
│✎ .whatmusik
│✎ .lirik
│✎ .ptv
│✎ .myanimelist
│✎ .searchanime
│✎ .animeinfo
│✎ .searchchar
│✎ .charinfo
│✎ .carigrupwa
│✎ .caristiker
│✎ .cekgempa
│✎ .cekkalender
│✎ .cekml
│✎ .cekcuaca
│✎ .cnbc
│✎ .cnn
│✎ .hiitwixtor
│✎ .igstalk
│✎ .otakudesu
│✎ .pinterest/pin
│✎ .play
│✎ .playch
│✎ .playtiktok
│✎ .playv2
│✎ .playvid
│✎ .spotify
│✎ .stalkroblox
│✎ .tiktokstalk
│✎ .yts
╰─────────────────

╭─⧉ 「GAME MENU 」──
│✎ .werewolf
│✎ .tictactoe
│✎ .kuismath
│✎ .sambungkata
│✎ .sambungkata2
│✎ .tebakhero
│✎ .tebakgenshin
│✎ .asahotak
│✎ .bom
│✎ .caklontong
│✎ .family100
│✎ .kuis
│✎ .lengkapikalimat
│✎ .siapakahaku
│✎ .susunkata
│✎ .tebakanime
│✎ .tebakbendera
│✎ .tebakff
│✎ .tebakgame
│✎ .tebakgambar
│✎ .tebakhewan
│✎ .tebakinggris
│✎ .tebakjkt
│✎ .tebakjorok
│✎ .tebakkah
│✎ .tebakkalimat
│✎ .tebakkata
│✎ .tebaklagu
│✎ .tebaklirik
│✎ .tebaklogo
│✎ .tebakmakanan
│✎ .tekateki
╰─────────────────

╭─⧉ 「ENCRYPT MENU 」──
│✎ .enccustom <nama>
│✎ .encinvis
│✎ .encsiu
│✎ .encstrong
│✎ .encultra
│✎ .enchard 🅟
│✎ .enc 🅟
│✎ .encryptcustom <nama>
│✎ .encryptinvis
│✎ .encryptsiu
│✎ .encryptstrong
│✎ .encryptultra
│✎ .customenc <nama>
│✎ .invisenc
│✎ .siuenc
│✎ .strongenc
│✎ .ultraenc
│✎ .custom-encrypt <nama>
│✎ .invis-encrypt
│✎ .siu-encrypt
│✎ .strong-encrypt
│✎ .ultra-encrypt
│✎ .enc-custom <nama>
│✎ .enc-invis
│✎ .enc-siu
│✎ .enc-strong
│✎ .enc-ultra
│✎ .enccustomjs <nama>
│✎ .encinvisible
│✎ .encryptinvisible
│✎ .invisibleenc
│✎ .invisible-encrypt
│✎ .enc-invisible
│✎ .eninvisiblejs
│✎ .jsinvisenc
│✎ .encjsinvis
│✎ .encsiujs
│✎ .jssiuenc
│✎ .siujsen
│✎ .encstrongjs
│✎ .jsstrongenc
│✎ .strongjsen
│✎ .encultrajs
│✎ .jsultraenc
│✎ .ultrajsen
│✎ .encryptcustomjs <nama>
│✎ .customjsen <nama>
╰─────────────────

╭─⧉ 「 STK MENU 」──
│✎ .stkbaik
│✎ .stkcantik
│✎ .stkganteng
│✎ .stkhitam
│✎ .stkmiskin
│✎ .stkkaya
│✎ .stkmarah
│✎ .stksabar
│✎ .stksakiti
│✎ .stkkeren
│✎ .stkmisterius
│✎ .stksantai
│✎ .stksombong
│✎ .stklucu
│✎ .stkgila
╰─────────────────

╭─⧉ 「RPG GAME MENU 」──
│✎ .daftar
│✎ .profile
│✎ .unreg
│✎ .werewolf
│✎ .buatstreak
│✎ .nyalainstreak 
│✎ .streak
│✎ .topstreak
│✎ .adopsipet
│✎ .attack
│✎ .begal
│✎ .berkebun
│✎ .buy
│✎ .claim
│✎ .craft
│✎ .daily
│✎ .dungeon
│✎ .equip
│✎ .flee
│✎ .spacegame
│✎ .foraging
│✎ .infopet
│✎ .inventory
│✎ .item
│✎ .jobkerja
│✎ .judionline
│✎ .kerja
│✎ .leaderboardrpg
│✎ .limit
│✎ .maling
│✎ .mancing
│✎ .mancingstart
│✎ .me
│✎ .meramu
│✎ .mining
│✎ .ngaji
│✎ .ngelonte
│✎ .ngocok
│✎ .ngojek
│✎ .openbo
│✎ .pvp
│✎ .quest
│✎ .rpgexplore
│✎ .rpghelp
│✎ .rpginv
│✎ .rpgmove
│✎ .rpgshop
│✎ .rpgstart
│✎ .rpgstats
│✎ .sell
│✎ .skill
│✎ .tambang
│✎ .toplevel
│✎ .use
╰─────────────────

╭─⧉ 「 EPHOTO MENU 」──
│✎ .glitchtext
│✎ .writetext
│✎ .advancedglow
│✎ .typographytext
│✎ .pixelglitch
│✎ .neonglitch
│✎ .flagtext
│✎ .flag3dtext
│✎ .deletingtext
│✎ .blackpinkstyle
│✎ .glowingtext
│✎ .underwatertext
│✎ .logomaker
│✎ .cartoonstyle
│✎ .papercutstyle
│✎ .watercolortext
│✎ .effectclouds
│✎ .blackpinklogo
│✎ .gradienttext
│✎ .summerbeach
│✎ .luxurygold
│✎ .multicoloredneon
│✎ .sandsummer
│✎ .galaxywallpaper
│✎ .1917style
│✎ .makingneon
│✎ .royaltext
│✎ .freecreate
│✎ .galaxystyle
│✎ .lighteffects
│✎ .blackpink
│✎ .dragonfire
│✎ .eraser
│✎ .galaxy
│✎ .grafitti
│✎ .horor
│✎ .incandescent
│✎ .nightstars
│✎ .pig
│✎ .pubg
│✎ .sunlight
│✎ .wood
│✎ .ytgoldbutton
│✎ .ytsilverbutton
╰─────────────────

╭─⧉ 「ISLAMI MENU 」──
│✎ .asmaulhusna
│✎ .audiosurah
│✎ .ayatkursi
│✎ .bacaansholat
│✎ .doa
│✎ .doaharian
│✎ .hadits
│✎ .jadwalsholat
│✎ .kisahnabi
│✎ .niatsholat
│✎ .quotesislami
│✎ .wirid
╰─────────────────

╭─⧉ 「CECAN MENU 」──
│✎ .cecanchina
│✎ .cecanhijaber
│✎ .cecanindonesia
│✎ .cecanjapan
│✎ .cecanjeni
│✎ .cecanjiso
│✎ .cecankorea
│✎ .cecanmalaysia
│✎ .cecanjustinaxie
│✎ .cecanrose
│✎ .cecanryujin
│✎ .cecanthailand
│✎ .cecanvietnam
╰─────────────────

╭─⧉ 「MENU PANEL 」──
│✎ .1gb
│✎ .2gb
│✎ .3gb
│✎ .4gb
│✎ .5gb
│✎ .6gb
│✎ .7gb
│✎ .8gb
│✎ .9gb
│✎ .10gb
│✎ .unli
│✎ .setpanel
│✎ .installpanel
│✎ .delpanel
│✎ .renewserver
│✎ .addreseller
│✎ .cekres
│✎ .delreseller
│✎ .listpanel
│✎ .listreseller
│✎ .cadp
╰─────────────────

╭─⧉ 「NSFW MENU 」──
│✎ .nsfw 🅟
│✎ .nsfwahegao 🅟
│✎ .nsfwass 🅟
│✎ .nsfwbdsm 🅟
│✎ .nsfwgangbang 🅟
│✎ .nsfwgay 🅟
│✎ .nsfwloli 🅟
│✎ .nsfwneko 🅟
│✎ .nsfwpussy 🅟
│✎ .nsfwzettai 🅟
╰─────────────────

╭─⧉ 「ANIME MENU 」──
│✎ .animeakira
│✎ .animeasuna
│✎ .animeeba
│✎ .animeelaina
│✎ .animeemilia
│✎ .animegremory
│✎ .animehinata
│✎ .animehusbu
│✎ .animeisuzu
│✎ .animeitori
│✎ .animekagura
│✎ .animekanna
│✎ .animemegumin
│✎ .animemiku
│✎ .animenezuko
│✎ .animensfwloli
│✎ .animepokemon
│✎ .animerem
│✎ .animeryuko
│✎ .animeshina
│✎ .animeshinka
│✎ .animeshota
│✎ .animetejina
│✎ .animetoukachan
│✎ .animewaifu
│✎ .animeyotsuba
│✎ .animeyuli
│✎ .animeyumeko
│✎ .animezero
╰─────────────────

╭─⧉ 「 ANIME / THEMA 」──
│ ✎ .akiyama
│ ✎ .ana
│ ✎ .art
│ ✎ .asuna
│ ✎ .ayuzawa
│ ✎ .boruto
│ ✎ .bts
│ ✎ .cartoon
│ ✎ .chiho
│ ✎ .chitoge
│ ✎ .cosplay
│ ✎ .cosplayloli
│ ✎ .cosplaysagiri
│ ✎ .cyber
│ ✎ .deidara
│ ✎ .doraemon
│ ✎ .forcexyz
│ ✎ .emilia
│ ✎ .erza
│ ✎ .exo
│ ✎ .gamewallpaper
│ ✎ .gremory
│ ✎ .hacker
│ ✎ .hestia
│ ✎ .hinata
│ ✎ .husbu
│ ✎ .inori
│ ✎ .islamic
│ ✎ .isuzu
│ ✎ .itachi
│ ✎ .itori
│ ✎ .jennie
│ ✎ .jiso
│ ✎ .justina
│ ✎ .kaga
│ ✎ .kagura
│ ✎ .kakasih
│ ✎ .kaori
│ ✎ .keneki
│ ✎ .kotori
│ ✎ .kurumi
│ ✎ .lisa
│ ✎ .madara
│ ✎ .megumin
│ ✎ .mikasa
│ ✎ .mikey
│ ✎ .miku
│ ✎ .minato
│ ✎ .mountain
│ ✎ .naruto
│ ✎ .neko2
│ ✎ .nekonime
│ ✎ .nezuko
│ ✎ .onepiece
│ ✎ .pentol
│ ✎ .pokemon
│ ✎ .programming
│ ✎ .randomnime
│ ✎ .randomnime2
│ ✎ .rize
│ ✎ .rose
│ ✎ .sagiri
│ ✎ .sakura
│ ✎ .sasuke
│ ✎ .satanic
│ ✎ .shina
│ ✎ .shinka
│ ✎ .shinomiya
│ ✎ .shizuka
│ ✎ .shota
│ ✎ .shortquote
│ ✎ .space
│ ✎ .technology
│ ✎ .tejina
│ ✎ .toukachan
│ ✎ .tsunade
│ ✎ .yotsuba
│ ✎ .yuki
│ ✎ .yulibocil
│ ✎ .yumeko
╰─────────────────

╭─⧉ 「STORE MENU 」──
│✎ .list
│✎ .setlist
│✎ .addlist
│✎ .dellist
│✎ .clearlist
│✎ .setpay
│✎ .delpay
│✎ .listpay
│✎ .setdone
│✎ .setproses
│✎ .done
│✎ .proses
│✎ .testimoni
│✎ .buyprem
│✎ .buysewagc
│✎ .done
│✎ .jpm
│✎ .jpm2
│✎ .jpmtesti
│✎ .payment
│✎ .proses
│✎ .pushkontak
│✎ .pushkontak2
│✎ .sendtesti
╰─────────────────

╭─⧉ 「GROUP MENU 」──
│✎ .banfitur
│✎ .intro
│✎ .setintro
│✎ .closetime
│✎ .opentime
│✎ .warn
│✎ .listwarn
│✎ .delwarn
│✎ .infowarn
│✎ .resetwarn
│✎ .infogrup
│✎ .hidetagpoll
│✎ .gcsider
│✎ .sidercek
│✎ .siderkick
│✎ .infouser
│✎ .setnamagc
│✎ .setppgc
│✎ .schedule
│✎ .autoabsen
│✎ .setabsen
│✎ .tagadmin
│✎ .acc
│✎ .tolakacc
│✎ .swgc
│✎ .swgcall
│✎ .totalchat
│✎ .resettotalchat
│✎ .setultah
│✎ .ultah
│✎ .delultah
│✎ .listultah
│✎ .afk
│✎ .onlyadmin
│✎ .add
│✎ .cekidch
│✎ .cekidgc
│✎ .close
│✎ .setclose
│✎ .setopen
│✎ .demote
│✎ .hidetag
│✎ .kick
│✎ .kudetagc
│✎ .leaderboard
│✎ .leave
│✎ .linkgc
│✎ .off
│✎ .on
│✎ .open
│✎ .promote
│✎ .resetlinkgc
│✎ .setleft
│✎ .setwelcome
│✎ .tagall
╰─────────────────

╭─⧉ 「OWNER MENU 」──
│✎ .renamebot
│✎ .setaudiomenu 
│✎ .setimage
│✎ .culikmember
│✎ .setdaftar
│✎ .setmenu
│✎ .stikercmd
│✎ .delstikercmd
│✎ .addaksesprem
│✎ .delaksesprem
│✎ .listaksesprem
│✎ .onlyprem
│✎ .autosholat
│✎ .addcase
│✎ .addlimit
│✎ .addlimitall
│✎ .addowner
│✎ .addprem
│✎ .addsewagc
│✎ .listsewagc
│✎ .delsewagc
│✎ .ceksewagc
│✎ .renewsewagc 
│✎ .antibot
│✎ .autobackup
│✎ .autoread
│✎ .autoreadsw
│✎ .autotyping
│✎ .backup
│✎ .blacklist
│✎ .cekprem
│✎ .clearchat
│✎ .clearprem
│✎ .creategc
│✎ .delcase
│✎ .dellimit
│✎ .delowner
│✎ .delprem
│✎ .getcase
│✎ .getsc
│✎ .joinch
│✎ .joingc
│✎ .listcase
│✎ .listgc
│✎ .listowner
│✎ .listprem
│✎ .pay2
│✎ .resetdb
│✎ .resetlimitall
│✎ .restartbot
│✎ .savekontak
│✎ .self/public
│✎ .setlimit
│✎ .setppbot
│✎ .unblacklist
│✎ .upchannel
│✎ .upchannel2
╰─────────────────`

global.menuowner = `
╭─⧉ 「OWNER MENU 」──
│✎ .renamebot
│✎ .setimage
│✎ .culikmember
│✎ .setdaftar
│✎ .setmenu
│✎ .stikercmd
│✎ .delstikercmd
│✎ .addaksesprem
│✎ .delaksesprem
│✎ .listaksesprem
│✎ .onlyprem
│✎ .autosholat
│✎ .addcase
│✎ .addlimit
│✎ .addlimitall
│✎ .addowner
│✎ .addprem
│✎ .addsewagc
│✎ .listsewagc
│✎ .delsewagc
│✎ .renewsewagc
│✎ .ceksewagc
│✎ .antibot
│✎ .autobackup
│✎ .autoread
│✎ .autoreadsw
│✎ .autotyping
│✎ .backup
│✎ .blacklist
│✎ .cekprem
│✎ .clearchat
│✎ .clearprem
│✎ .creategc
│✎ .delcase
│✎ .dellimit
│✎ .delowner
│✎ .delprem
│✎ .getcase
│✎ .getsc
│✎ .joinch
│✎ .joingc
│✎ .listcase
│✎ .listgc
│✎ .listowner
│✎ .listprem
│✎ .pay2
│✎ .resetdb
│✎ .resetlimitall
│✎ .restartbot
│✎ .savekontak
│✎ .self/public
│✎ .setlimit
│✎ .setppbot
│✎ .unblacklist
│✎ .upchannel
│✎ .upchannel2
╰─────────────────`

global.menuenc = `
╭─⧉ 「ENCRYPT MENU 」──
│✎ .enccustom <nama>
│✎ .encinvis
│✎ .encsiu
│✎ .encstrong
│✎ .encultra
│✎ .enchard 🅟
│✎ .enc 🅟
│✎ .encryptcustom <nama>
│✎ .encryptinvis
│✎ .encryptsiu
│✎ .encryptstrong
│✎ .encryptultra
│✎ .customenc <nama>
│✎ .invisenc
│✎ .siuenc
│✎ .strongenc
│✎ .ultraenc
│✎ .custom-encrypt <nama>
│✎ .invis-encrypt
│✎ .siu-encrypt
│✎ .strong-encrypt
│✎ .ultra-encrypt
│✎ .enc-custom <nama>
│✎ .enc-invis
│✎ .enc-siu
│✎ .enc-strong
│✎ .enc-ultra
│✎ .enccustomjs <nama>
│✎ .encinvisible
│✎ .encryptinvisible
│✎ .invisibleenc
│✎ .invisible-encrypt
│✎ .enc-invisible
│✎ .eninvisiblejs
│✎ .jsinvisenc
│✎ .encjsinvis
│✎ .encsiujs
│✎ .jssiuenc
│✎ .siujsen
│✎ .encstrongjs
│✎ .jsstrongenc
│✎ .strongjsen
│✎ .encultrajs
│✎ .jsultraenc
│✎ .ultrajsen
│✎ .encryptcustomjs <nama>
│✎ .customjsen <nama>
╰─────────────────`

global.menugroup = `
╭─⧉ 「GROUP MENU 」──
│✎ .banfitur
│✎ .intro
│✎ .setintro
│✎ .warn
│✎ .listwarn
│✎ .delwarn
│✎ .infowarn
│✎ .resetwarn
│✎ .hidetagpoll
│✎ .gcsider
│✎ .sidercek
│✎ .siderkick
│✎ .unfouser
│✎ .setnamagc
│✎ .setppgc
│✎ .schedule
│✎ .autoabsen
│✎ .setabsen
│✎ .tagadmin
│✎ .acc
│✎ .tolakacc
│✎ .swgc
│✎ .swgcall
│✎ .totalchat
│✎ .resettotalchat
│✎ .setultah
│✎ .ultah
│✎ .delultah
│✎ .listultah
│✎ .afk
│✎ .onlyadmin
│✎ .add
│✎ .cekidch
│✎ .cekidgc
│✎ .close
│✎ .setclose
│✎ .setopen
│✎ .demote
│✎ .hidetag
│✎ .kick
│✎ .kudetagc
│✎ .leaderboard
│✎ .leave
│✎ .linkgc
│✎ .off
│✎ .on
│✎ .open
│✎ .promote
│✎ .resetlinkgc
│✎ .setleft
│✎ .setwelcome
│✎ .tagall
╰─────────────────`

global.menustore = `
╭─⧉ 「STORE MENU 」──
│✎ .list
│✎ .setlist
│✎ .addlist
│✎ .dellist
│✎ .clearlist
│✎ .setpay
│✎ .delpay
│✎ .listpay
│✎ .setdone
│✎ .setproses
│✎ .done
│✎ .proses
│✎ .testimoni
│✎ .buyprem
│✎ .buysewagc
│✎ .done
│✎ .jpm
│✎ .jpm2
│✎ .jpmtesti
│✎ .payment
│✎ .proses
│✎ .pushkontak
│✎ .pushkontak2
│✎ .sendtesti
╰─────────────────
`
global.menustk = `
╭─⧉ 「 STK MENU 」──
│✎ .stkbaik
│✎ .stkcantik
│✎ .stkganteng
│✎ .stkhitam
│✎ .stkmiskin
│✎ .stkkaya
│✎ .stkmarah
│✎ .stksabar
│✎ .stksakiti
│✎ .stkkeren
│✎ .stkmisterius
│✎ .stksantai
│✎ .stksombong
│✎ .stklucu
│✎ .stkgila
╰─────────────────`

global.menuanime = `
╭─⧉ 「ANIME MENU 」──
│✎ .animeakira
│✎ .animeasuna
│✎ .animeeba
│✎ .animeelaina
│✎ .animeemilia
│✎ .animegremory
│✎ .animehinata
│✎ .animehusbu
│✎ .animeisuzu
│✎ .animeitori
│✎ .animekagura
│✎ .animekanna
│✎ .animemegumin
│✎ .animemiku
│✎ .animenezuko
│✎ .animensfwloli
│✎ .animepokemon
│✎ .animerem
│✎ .animeryuko
│✎ .animeshina
│✎ .animeshinka
│✎ .animeshota
│✎ .animetejina
│✎ .animetoukachan
│✎ .animewaifu
│✎ .animeyotsuba
│✎ .animeyuli
│✎ .animeyumeko
│✎ .animezero
╰─────────────────
`
global.menunsfw = `
╭─⧉ 「NSFW MENU 」──
│✎ .nsfw 🅟
│✎ .nsfwahegao 🅟
│✎ .nsfwass 🅟
│✎ .nsfwbdsm 🅟
│✎ .nsfwgangbang 🅟
│✎ .nsfwgay 🅟
│✎ .nsfwloli 🅟
│✎ .nsfwneko 🅟
│✎ .nsfwpussy 🅟
│✎ .nsfwzettai 🅟
╰─────────────────
`
global.menupanel = `
╭─⧉ 「MENU PANEL 」──
│✎ .1gb
│✎ .2gb
│✎ .3gb
│✎ .4gb
│✎ .5gb
│✎ .6gb
│✎ .7gb
│✎ .8gb
│✎ .9gb
│✎ .10gb
│✎ .unli
│✎ .setpanel
│✎ .installpanel
│✎ .delpanel
│✎ .renewserver
│✎ .addreseller
│✎ .cekres
│✎ .delreseller
│✎ .listpanel
│✎ .listreseller
│✎ .cadp
╰─────────────────
`
global.menucecan = ` 
╭─⧉ 「CECAN MENU 」──
│✎ .cecanchina
│✎ .cecanhijaber
│✎ .cecanindonesia
│✎ .cecanjapan
│✎ .cecanjeni
│✎ .cecanjiso
│✎ .cecankorea
│✎ .cecanmalaysia
│✎ .cecanjustinaxie
│✎ .cecanrose
│✎ .cecanryujin
│✎ .cecanthailand
│✎ .cecanvietnam
╰─────────────────
`
global.menuislam = ` 
╭─⧉ 「ISLAMI MENU 」──
│✎ .asmaulhusna
│✎ .audiosurah
│✎ .ayatkursi
│✎ .bacaansholat
│✎ .doa
│✎ .doaharian
│✎ .hadits
│✎ .jadwalsholat
│✎ .kisahnabi
│✎ .niatsholat
│✎ .quotesislami
│✎ .wirid
╰─────────────────
`
global.menuehpoto = ` 
╭─⧉ 「 EPHOTO MENU 」──
│✎ .glitchtext
│✎ .writetext
│✎ .advancedglow
│✎ .typographytext
│✎ .pixelglitch
│✎ .neonglitch
│✎ .flagtext
│✎ .flag3dtext
│✎ .deletingtext
│✎ .blackpinkstyle
│✎ .glowingtext
│✎ .underwatertext
│✎ .logomaker
│✎ .cartoonstyle
│✎ .papercutstyle
│✎ .watercolortext
│✎ .effectclouds
│✎ .blackpinklogo
│✎ .gradienttext
│✎ .summerbeach
│✎ .luxurygold
│✎ .multicoloredneon
│✎ .sandsummer
│✎ .galaxywallpaper
│✎ .1917style
│✎ .makingneon
│✎ .royaltext
│✎ .freecreate
│✎ .galaxystyle
│✎ .lighteffects
│✎ .blackpink
│✎ .dragonfire
│✎ .eraser
│✎ .galaxy
│✎ .grafitti
│✎ .horor
│✎ .incandescent
│✎ .nightstars
│✎ .pig
│✎ .pubg
│✎ .sunlight
│✎ .wood
│✎ .ytgoldbutton
│✎ .ytsilverbutton
╰─────────────────
`
global.menurpg = `
╭─⧉ 「RPG GAME MENU 」──
│✎ .daftar
│✎ .profile
│✎ .unreg
│✎ .werewolf
│✎ .buatstreak
│✎ .nyalainstreak 
│✎ .streak
│✎ .topstreak
│✎ .adopsipet
│✎ .attack
│✎ .begal
│✎ .berkebun
│✎ .buy
│✎ .claim
│✎ .craft
│✎ .daily
│✎ .dungeon
│✎ .equip
│✎ .flee
│✎ .spacegame
│✎ .foraging
│✎ .infopet
│✎ .inventory
│✎ .item
│✎ .jobkerja
│✎ .judionline
│✎ .kerja
│✎ .leaderboardrpg
│✎ .limit
│✎ .maling
│✎ .mancing
│✎ .mancingstart
│✎ .me
│✎ .meramu
│✎ .mining
│✎ .ngaji
│✎ .ngelonte
│✎ .ngocok
│✎ .ngojek
│✎ .openbo
│✎ .pvp
│✎ .quest
│✎ .rpgexplore
│✎ .rpghelp
│✎ .rpginv
│✎ .rpgmove
│✎ .rpgshop
│✎ .rpgstart
│✎ .rpgstats
│✎ .sell
│✎ .skill
│✎ .tambang
│✎ .toplevel
│✎ .use
╰─────────────────
`
global.menugame = ` 
╭─⧉ 「GAME MENU 」──
│✎ .werewolf
│✎ .tictactoe
│✎ .kuismath
│✎ .sambungkata
│✎ .sambungkata2
│✎ .tebakhero
│✎ .tebakgenshin
│✎ .asahotak
│✎ .bom
│✎ .caklontong
│✎ .family100
│✎ .kuis
│✎ .lengkapikalimat
│✎ .siapakahaku
│✎ .susunkata
│✎ .tebakanime
│✎ .tebakbendera
│✎ .tebakff
│✎ .tebakgame
│✎ .tebakgambar
│✎ .tebakhewan
│✎ .tebakinggris
│✎ .tebakjkt
│✎ .tebakjorok
│✎ .tebakkah
│✎ .tebakkalimat
│✎ .tebakkata
│✎ .tebaklagu
│✎ .tebaklirik
│✎ .tebaklogo
│✎ .tebakmakanan
│✎ .tekateki
╰─────────────────
`
global.menusearch = `
╭─⧉ 「SEARCH MENU 」──
│✎ .toproblox
│✎ .gsmarena
│✎ .wattpad
│✎ .searchgame
│✎ .soundcloud
│✎ .npmjs
│✎ .whatmusik
│✎ .lirik
│✎ .ptv
│✎ .myanimelist
│✎ .searchanime
│✎ .animeinfo
│✎ .searchchar
│✎ .charinfo
│✎ .carigrupwa
│✎ .caristiker
│✎ .cekgempa
│✎ .cekkalender
│✎ .cekml
│✎ .cekcuaca
│✎ .cnbc
│✎ .cnn
│✎ .hiitwixtor
│✎ .igstalk
│✎ .otakudesu
│✎ .pinterest/pin
│✎ .play
│✎ .playch
│✎ .playtiktok
│✎ .playv2
│✎ .playvid
│✎ .spotify
│✎ .stalkroblox
│✎ .tiktokstalk
│✎ .yts
╰─────────────────
`
global.menudownlod = ` 
╭─⧉ 「DOWNLOAD MENU 」──
│✎ .tiktok
│✎ .tiktokmp3
│✎ .twitter
│✎ .ytmp3
│✎ .ytmp4
│✎ .pinterest
│✎ .pindl
│✎ .alipdl support all link
│✎ .capcut
│✎ .facebook
│✎ .gitclone
│✎ .gdrive
│✎ .instagram
│✎ .mediafire
│✎ .pastebin
│✎ .play1
│✎ .spdown
│✎ .telesticker
│✎ .douyin
│✎ .likee
│✎ .snackvideo
│✎ .threads
│✎ .videy
╰─────────────────
`
global.menuai = ` 
╭─⧉ 「AI MENU 」──
│✎ .aimention
│✎ .publicai
│✎ .powerbrain
│✎ .venice
│✎ .webpilot
│✎ .logicbell
│✎ .bard
│✎ .hyperai
│✎ .autoai
│✎ .ai
│✎ .airealtime
│✎ .gpt5plus 🅟
│✎ .soraai 🅟
│✎ .openai 
│✎ .groq
│✎ .customai 
╰─────────────────
`
global.menufun = `
╭─⧉ 「FUN MENU 」──
│✎ .afk
│✎ .artinama
│✎ .cekbeban
│✎ .cekbucin
│✎ .cekfemboy
│✎ .cekgay
│✎ .cekjodoh
│✎ .cekjones
│✎ .cekkaya
│✎ .cekkodam
│✎ .cekkontol
│✎ .cekmasadepan
│✎ .cekmemek
│✎ .ceksange
│✎ .cekstress
│✎ .cekwibu
│✎ .fakeml
│✎ .faktadunia
│✎ .faktaunik
│✎ .infonegara
│✎ .jumlahuser
│✎ .kecocokanpasangan
│✎ .kirimch
│✎ .meme
│✎ .pakustad
│✎ .planet
│✎ .quotesanime
│✎ .sertifikattolol
│✎ .tafsirmimpi
│✎ .waifu
╰─────────────────
`
global.menuprimbon = `
╭─⧉ 「PRIMBON MENU 」──
│✎ .artinama
│✎ .cekaura
│✎ .ceksial
│✎ .darkjoke
│✎ .isidompet
│✎ .jodohmakanan
│✎ .kecocokannama
│✎ .nasibbatere
│✎ .nomerhoki
│✎ .pantun
│✎ .profesiku
│✎ .quotes
│✎ .ramalancinta
│✎ .ramalanjodoh
│✎ .ramalanjodohbali
│✎ .ramalannasib
│✎ .scankontol
│✎ .scanmemek
│✎ .suamiistri
│✎ .zodiak
╰─────────────────
`
global.menumaker = `
╭─⧉ 「MAKER MENU 」──
│✎ .animediff 🅟
│✎ .photoai
│✎ .fakektp
│✎ .carbon
│✎ .tofigure 
│✎ .telanjang 🅟
│✎ .fakestory
│✎ .tosunda 🅟
│✎ .tojawa 
│✎ .hijabpin 
│✎ .hitamin
│✎ .todonghua 🅟
│✎ .tomanhwa 🅟
│✎ .toanime 🅟
│✎ .tomanga 🅟
│✎ .topenjara 
│✎ .alipedit 🅟
│✎ .putihkan 🅟
│✎ .aiedit 🅟
│✎ .banana 🅟
│✎ .sdm 🅟
│✎ .tomoai
│✎ .topacar
│✎ .tomonyet
│✎ .tosatan
│✎ .toroblox
│✎ .topunk
│✎ .tomangu
│✎ .tosad
│✎ .todpr
│✎ .tobabi
│✎ .buatgambar
│✎ .buatlagu 🅟
│✎ .buatvideo 🅟
│✎ .ghibli 🅟
│✎ .tobotak 🅟
│✎ .tochibi 🅟
│✎ .todino 🅟
│✎ .jadidisney
│✎ .jadigta
│✎ .jadipixar
│✎ .nglspam 🅟
│✎ .polaroid 🅟
│✎ .tofootball 🅟
│✎ .tokartun 🅟
│✎ .veo3 🅟
│✎ .zrooart
│✎ .tospiderman
│✎ .tonaruto
│✎ .tobatman
│✎ .tosuperman
│✎ .toironman
│✎ .tocaptainamerica
│✎ .tothor
│✎ .tohulk
│✎ .towolverine
│✎ .todeadpool
│✎ .toflash
│✎ .toaquaman
│✎ .tocyan
│✎ .tovision
│✎ .toblackpanther
│✎ .tostarlord
│✎ .togroot
│✎ .torocket
│✎ .todracula
│✎ .tofrankenstein
│✎ .towerewolf
│✎ .tozombie
│✎ .tovampire
│✎ .toghost
│✎ .toskeleton
│✎ .todevil
│✎ .toangel
│✎ .tofairy
│✎ .towizard
│✎ .towinged
│✎ .toelf
│✎ .todwarf
│✎ .toorc
│✎ .totroll
│✎ .togiant
│✎ .tominotaur
│✎ .tomedusa
│✎ .tocentaur
│✎ .togriffin
│✎ .tophoenix
│✎ .todragon
│✎ .tounicorn
│✎ .topeacock
│✎ .towolf
│✎ .tofox
│✎ .tobear
│✎ .tolion
│✎ .totiger
│✎ .topanda
│✎ .tokoala
│✎ .topenguin
│✎ .toowl
│✎ .toeagle
│✎ .tofalcon
│✎ .toraven
│✎ .tocrow
│✎ .tosnake
│✎ .toshark
│✎ .tocrocodile
│✎ .tooctopus
│✎ .tojellyfish
│✎ .tostarfish
│✎ .toseahorse
│✎ .todolphin
│✎ .towhale
│✎ .torobot
│✎ .tocyborg
│✎ .toandroid
│✎ .toalien
│✎ .toufo
│✎ .toastronaut
│✎ .tocosmonaut
│✎ .toscuba
│✎ .todiver
│✎ .topirate
│✎ .tocowboy
│✎ .toninja
│✎ .tosamurai
│✎ .toviking
│✎ .toknight
│✎ .toarcher
│✎ .tomage
│✎ .tocleric
│✎ .tobard
│✎ .torogue
│✎ .tomonk
│✎ .tobarbarian
│✎ .tonecromancer
│✎ .todruid
│✎ .toranger
│✎ .topaladin
│✎ .togunslinger
│✎ .tomechanic
│✎ .toscientist
│✎ .todoctor
│✎ .toengineer
│✎ .toartist
│✎ .tosinger
│✎ .todancer
│✎ .toactor
│✎ .todirector
│✎ .towriter
│✎ .tophotographer
│✎ .tochef
│✎ .tobaker
│✎ .tobarista
│✎ .tobartender
│✎ .topilot
│✎ .todriver
│✎ .tosailor
│✎ .tosoldier
│✎ .topoliceman
│✎ .tofirefighter
│✎ .toteacher
│✎ .toprofessor
│✎ .tostudent
│✎ .toprogrammer
│✎ .todesigner
│✎ .totester
│✎ .tomanager
│✎ .toboss
│✎ .toceo
│✎ .tocfo
│✎ .tocoo
│✎ .tocmo
│✎ .tocto
│✎ .tocpo
│✎ .tocko
│✎ .toclown
│✎ .tomime
│✎ .tojester
│✎ .tomagician
│✎ .toillusionist
│✎ .toescapeartist
│✎ .toacrobat
│✎ .tocontortionist
│✎ .toswordswallower
│✎ .tofirebreather
│✎ .tojugger
│✎ .tounicyclist
│✎ .totightrope
│✎ .totrapeze
│✎ .toaerialist
│✎ .tocannon
│✎ .tostilts
│✎ .tomask
│✎ .tomummy
│✎ .tozorro
│✎ .tosherlock
│✎ .tophantom
│✎ .todraco
│✎ .tohannibal
│✎ .tojoker
│✎ .tovenom
│✎ .tocarnage
│✎ .togreen
│✎ .tolizard
│✎ .torhino
│✎ .tovulture
│✎ .toelectro
│✎ .tosandman
│✎ .tomysterio
│✎ .togoblin
│✎ .tochemo
│✎ .toloki
│✎ .tothanos
│✎ .togalactus
│✎ .todarkseid
│✎ .tobrainiac
│✎ .todoomsday
│✎ .tobizarro
│✎ .tometallo
│✎ .toparasite
│✎ .togrodd
│✎ .tocircus
│✎ .toreverse
│✎ .tomirror
│✎ .togold
│✎ .tosilver
│✎ .tobronze
│✎ .tocopper
│✎ .tosteel
│✎ .tocarbon
│✎ .tocrystal
│✎ .todiamond
│✎ .tosapphire
│✎ .toruby
│✎ .toemerald
│✎ .totopaz
│✎ .toamethyst
│✎ .toopal
│✎ .toperidot
│✎ .toaquamarine
│✎ .tocitrine
│✎ .totourmaline
│✎ .togarnet
│✎ .tospinel
│✎ .tozircon
│✎ .totanzanite
│✎ .toiolite
│✎ .tohematite
│✎ .tomoonstone
│✎ .tosunstone
│✎ .tostarstone
│✎ .tocomet
│✎ .tometeor
│✎ .toasteroid
│✎ .tonebula
│✎ .togalaxy
│✎ .touniverse
│✎ .toblackhole
│✎ .towormhole
│✎ .toportal
│✎ .totime
│✎ .tospace
│✎ .todimension
│✎ .toparallel
│✎ .toalternate
│✎ .tomultiverse
│✎ .tomegaverse
│✎ .tometaverse
│✎ .toomniverse
╰─────────────────
`
global.menutolls = ` 
╭─⧉ 「TOOLS MENU 」──
│✎ .saveweb
│✎ .ttsbrando
│✎ .ptvch
│✎ .voicecover 🅟
│✎ .vocalremover
│✎ .tempo
│✎ .speech2text 
│✎ .sidompul
│✎ .togif
│✎ .tovn
│✎ .hdvid 🅟
│✎ .tomp3
│✎ .ai
│✎ .aitts
│✎ .ambilsw
│✎ .donate
│✎ .enc 🅟
│✎ .enchard 🅟
│✎ .fakecall
│✎ .getpp
│✎ .gptonline
│✎ .gptimg
│✎ .hd
│✎ .iqc
│✎ .kapanreset
│✎ .ngl
│✎ .nulis
│✎ .ocr 🅟
│✎ .rch
│✎ .rvo 🅟
│✎ .shortlink
│✎ .shortlink2
│✎ .ssweb
│✎ .struk
│✎ .texttosound
│✎ .tourl
│✎ .tourl2 🅟
│✎ .tourl3
│✎ .translate
│✎ .ytsummarizer
╰─────────────────
`
global.menusticker = `
╭─⧉ 「STICKERS MENU 」──
│✎ .brat
│✎ .bradvid
│✎ .bratanime
│✎ .bratgambar
│✎ .bratgambarhd
│✎ .bratimg3
│✎ .bratpink
│✎ .ytcomment
│✎ .bratvid
│✎ .emoji
│✎ .emojigif
│✎ .emojimix
│✎ .manusialidi
│✎ .qc
│✎ .smeme
│✎ .sticker
│✎ .stikeranime
│✎ .stikerdinokuning
│✎ .stikergojo
│✎ .stikermukalu
│✎ .stikerpentol
│✎ .stikerrandom
│✎ .stikerspongebob
│✎ .swm 🅟
│✎ .toimg
│✎ .tvstiker
╰─────────────────
`
global.potoanime = `
╭─⧉ 「 ANIME / THEMA 」──
│ ✎ .akiyama
│ ✎ .ana
│ ✎ .art
│ ✎ .asuna
│ ✎ .ayuzawa
│ ✎ .boruto
│ ✎ .bts
│ ✎ .cartoon
│ ✎ .chiho
│ ✎ .chitoge
│ ✎ .cosplay
│ ✎ .cosplayloli
│ ✎ .cosplaysagiri
│ ✎ .cyber
│ ✎ .deidara
│ ✎ .doraemon
│ ✎ .forcexyz
│ ✎ .emilia
│ ✎ .erza
│ ✎ .exo
│ ✎ .gamewallpaper
│ ✎ .gremory
│ ✎ .hacker
│ ✎ .hestia
│ ✎ .hinata
│ ✎ .husbu
│ ✎ .inori
│ ✎ .islamic
│ ✎ .isuzu
│ ✎ .itachi
│ ✎ .itori
│ ✎ .jennie
│ ✎ .jiso
│ ✎ .justina
│ ✎ .kaga
│ ✎ .kagura
│ ✎ .kakasih
│ ✎ .kaori
│ ✎ .keneki
│ ✎ .kotori
│ ✎ .kurumi
│ ✎ .lisa
│ ✎ .madara
│ ✎ .megumin
│ ✎ .mikasa
│ ✎ .mikey
│ ✎ .miku
│ ✎ .minato
│ ✎ .mountain
│ ✎ .naruto
│ ✎ .neko2
│ ✎ .nekonime
│ ✎ .nezuko
│ ✎ .onepiece
│ ✎ .pentol
│ ✎ .pokemon
│ ✎ .programming
│ ✎ .randomnime
│ ✎ .randomnime2
│ ✎ .rize
│ ✎ .rose
│ ✎ .sagiri
│ ✎ .sakura
│ ✎ .sasuke
│ ✎ .satanic
│ ✎ .shina
│ ✎ .shinka
│ ✎ .shinomiya
│ ✎ .shizuka
│ ✎ .shota
│ ✎ .shortquote
│ ✎ .space
│ ✎ .technology
│ ✎ .tejina
│ ✎ .toukachan
│ ✎ .tsunade
│ ✎ .yotsuba
│ ✎ .yuki
│ ✎ .yulibocil
│ ✎ .yumeko
╰─────────────────
`

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
});