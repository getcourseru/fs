export function getPrice(data, options) {
    const [packageKind, teacherKind, lessonDuration, lessonCount] = options;
    const [a, ] = data.filter(item => item.lessonDuration === lessonDuration && item.teacherKind === teacherKind);
    let b;
    switch (packageKind) {
        case `pack`:
            [b, ] = a.packages.filter(item => item.lessonCount === lessonCount)
            document.title = 'Уроки с преподавателем';
            break
        case `abon`:
            [b, ] = a.subscriptions.filter(item => item.lessonCount === lessonCount)
            document.title = 'Уроки с преподавателем';
            break
        case `group`:
            [b, ] = a.groups.filter(item => item.lessonCount === lessonCount)
            document.title = 'Уроки с преподавателем в группе';
            break
    };
    return b.price
};