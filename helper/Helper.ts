function parseHour(hourStr: string): number {
    if (!hourStr) return -1;

    // 🔥 NUEVO: Detectar "12m" como mediodía (12:00)
    if (hourStr.trim().toLowerCase() === '12m') {
        return 12 * 60; // 12:00 en minutos (720 minutos)
    }

    const match = hourStr.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm|m)?$/i);
    if (!match) return -1;

    let hour = parseInt(match[1], 10);
    const minute = match[2] ? parseInt(match[2], 10) : 0;
    const meridian = match[3]?.toLowerCase();

    // Conversión a formato 24h
    if (meridian === "pm" && hour < 12) hour += 12;
    if (meridian === "am" && hour === 12) hour = 0;
    if (meridian === "m" && hour === 12) hour = 12; // 🔥 NUEVO: 12m = 12:00 (mediodía)
    if (hour === 24) hour = 0;

    return hour * 60 + minute;
}

function dayToIndex(day: string): number {
    const days: { [key: string]: number } = {
        'lun': 1, 'mar': 2, 'mie': 3, 'jue': 4, 'vie': 5, 'sab': 6, 'dom': 0,
        'lunes': 1, 'martes': 2, 'miercoles': 3, 'jueves': 4, 'viernes': 5, 'sabado': 6, 'domingo': 0
    };
    return days[day.toLowerCase().substring(0, 3)] ?? -1;
}

export function isBusinessOpen(hours: string): boolean {
    // 🔥 PRIMERO: Si el horario contiene "cerrado", retornar false inmediatamente
    if (!hours || /cerrado|closed/i.test(hours)) {
        console.log('❌ NEGOCIO CERRADO - Horario indica "cerrado"');
        return false;
    }

    const now = new Date();
    const currentDay = now.getDay(); // 0=Dom, 1=Lun, 2=Mar...
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    console.log('=== DEBUG HORARIOS ===');
    console.log('Hora actual:', now.toLocaleString('es-CO')); 
    console.log('Día actual (JS):', currentDay, ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'][currentDay]);
    console.log('Minutos desde medianoche:', currentMinutes);
    console.log('Horario a evaluar:', hours);

    const entries = hours.split(",").map(e => e.trim());

    for (const entry of entries) {
        // 🔥 Manejar "Lun-Lun" como todos los días de la semana
        if (entry.toLowerCase().includes('lun-lun')) {
            const timeMatch = entry.match(/(\d+(?:m)?)(?::(\d{2}))?\s*(am|pm|m)?\s*-\s*(\d+(?:m)?)(?::(\d{2}))?\s*(am|pm|m)?/i);
            if (timeMatch) {
                const openMinutes = parseHour((timeMatch[1] || '') + (timeMatch[3] || ''));
                const closeMinutes = parseHour((timeMatch[4] || '') + (timeMatch[6] || ''));
                
                console.log('🌀 Lun-Lun detectado - Horario:', { openMinutes, closeMinutes });
                
                if (openMinutes <= closeMinutes) {
                    if (currentMinutes >= openMinutes && currentMinutes <= closeMinutes) {
                        console.log('✅ NEGOCIO ABIERTO - Lun-Lun horario normal');
                        return true;
                    }
                } else {
                    if (currentMinutes >= openMinutes || currentMinutes <= closeMinutes) {
                        console.log('✅ NEGOCIO ABIERTO - Lun-Lun horario cruzado');
                        return true;
                    }
                }
            }
            continue;
        }

        if (/cerrado/i.test(entry)) continue;

        const parts = entry.split(" ").filter(p => p.trim() !== '');
        if (parts.length < 2) continue;

        const daysPart = parts[0];
        const hoursPart = parts.slice(1).join(" ");

        const [startDay, endDay] = daysPart.split("-").map(d => d.trim());
        const [openStr, closeStr] = hoursPart.split("-").map(h => h.trim());

        console.log('Procesando:', { startDay, endDay, openStr, closeStr });

        const openMinutes = parseHour(openStr);
        const closeMinutes = parseHour(closeStr);
        
        const startIndex = dayToIndex(startDay);
        const endIndex = endDay ? dayToIndex(endDay) : startIndex;

        console.log('Índices:', { 
            startIndex, 
            endIndex, 
            openMinutes, 
            closeMinutes,
            openTime: `${Math.floor(openMinutes/60)}:${openMinutes%60}`,
            closeTime: `${Math.floor(closeMinutes/60)}:${closeMinutes%60}`
        });

        // Verificar rango de días
        let inDayRange = false;
        
        if (startIndex <= endIndex) {
            inDayRange = currentDay >= startIndex && currentDay <= endIndex;
        } else {
            inDayRange = currentDay >= startIndex || currentDay <= endIndex;
        }

        console.log('¿Está en rango de días?', inDayRange);

        if (!inDayRange) continue;

        // Verificar horario
        if (openMinutes <= closeMinutes) {
            if (currentMinutes >= openMinutes && currentMinutes <= closeMinutes) {
                console.log('✅ NEGOCIO ABIERTO - Horario normal');
                return true;
            }
        } else {
            if (currentMinutes >= openMinutes || currentMinutes <= closeMinutes) {
                console.log('✅ NEGOCIO ABIERTO - Horario cruzado');
                return true;
            }
        }
    }

    console.log('❌ NEGOCIO CERRADO - No coincide con ningún horario');
    return false;
}